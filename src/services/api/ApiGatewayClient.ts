import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { getGlobalAppCustomer } from '../../workflow/context/workflowContextInstance';
import { RaiseErrorWorkflow } from '../../workflow/workflows/RaiseErrorWorkflow';
import type { WebexFormData } from './ApiGatewayTypes';

class ApiGatewayClient {
  private static instance: ApiGatewayClient;
  private region: string;
  private apiGatewayId: string;
  private identityPoolId: string;
  private service = 'execute-api';
  private stage: string;
  private credentialsProvider: import('@aws-sdk/types').AwsCredentialIdentityProvider;
  private cachedCredentials:
    | import('@aws-sdk/types').AwsCredentialIdentity
    | null = null;
  private credentialsExpiry: Date | null = null;
  private signer: SignatureV4;

  private constructor() {
    // Validate required environment variables
    this.region = import.meta.env.VITE_AWS_REGION;
    this.apiGatewayId = import.meta.env.VITE_API_GATEWAY_ID;
    this.identityPoolId = import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID;
    this.stage = import.meta.env.VITE_API_GATEWAY_STAGE;

    if (!this.apiGatewayId) {
      throw new Error(
        'VITE_API_GATEWAY_ID is not defined in environment variables'
      );
    }
    if (!this.region) {
      throw new Error(
        'VITE_AWS_REGION is not defined in environment variables'
      );
    }
    if (!this.identityPoolId) {
      throw new Error(
        'VITE_COGNITO_IDENTITY_POOL_ID is not defined in environment variables'
      );
    }

    // Initialize AWS Cognito credentials provider (created once)
    this.credentialsProvider = fromCognitoIdentityPool({
      identityPoolId: this.identityPoolId,
      clientConfig: { region: this.region },
    });

    // Initialize AWS SigV4 signer with cached credentials
    this.signer = new SignatureV4({
      credentials: async () => this.getCredentials(),
      region: this.region,
      service: this.service,
      sha256: Sha256,
    });

    console.log('ApiGatewayClient initialized:', {
      region: this.region,
      stage: this.stage,
    });
  }

  public static getInstance(): ApiGatewayClient {
    if (!ApiGatewayClient.instance) {
      ApiGatewayClient.instance = new ApiGatewayClient();
    }
    return ApiGatewayClient.instance;
  }

  /**
   * Get AWS credentials with caching
   * Credentials are cached and only refreshed when expired
   */
  private async getCredentials(): Promise<
    import('@aws-sdk/types').AwsCredentialIdentity
  > {
    const now = new Date();

    // Check if we have valid cached credentials
    if (
      this.cachedCredentials &&
      this.credentialsExpiry &&
      now < this.credentialsExpiry
    ) {
      console.log('Using cached AWS credentials');
      return this.cachedCredentials;
    }

    // Fetch new credentials
    console.log('Fetching new AWS credentials...');
    const credentials = await this.credentialsProvider();

    // Cache the credentials
    this.cachedCredentials = credentials;

    // Set expiry time - AWS Cognito credentials typically expire after 1 hour
    // We'll refresh 5 minutes before expiry to be safe
    if (credentials.expiration) {
      this.credentialsExpiry = new Date(
        credentials.expiration.getTime() - 5 * 60 * 1000
      );
    } else {
      // If no expiration provided, cache for 55 minutes
      this.credentialsExpiry = new Date(now.getTime() + 55 * 60 * 1000);
    }

    console.log('AWS credentials cached until:', this.credentialsExpiry);
    return credentials;
  }

  /**
   * Build the base request object
   */
  private buildRequest(
    method: string,
    path: string,
    body?: object
  ): HttpRequest {
    // Remove leading slash from path if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const hostname = `${this.apiGatewayId}.execute-api.${this.region}.amazonaws.com`;

    return new HttpRequest({
      method,
      protocol: 'https:',
      hostname,
      path: `/${this.stage}/${cleanPath}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        host: hostname,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Sign the request with AWS SigV4
   */
  private async signRequest(
    request: HttpRequest
  ): Promise<HttpRequest & { headers: Record<string, string> }> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const signed = await this.signer.sign(request as any);
    return signed as unknown as HttpRequest & {
      headers: Record<string, string>;
    };
  }

  /**
   * Make the HTTP request
   */
  private async makeRequest(
    signedRequest: HttpRequest & { headers: Record<string, string> }
  ) {
    const url = `https://${signedRequest.hostname}${signedRequest.path}`;

    // Convert headers to fetch-compatible format
    const fetchHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(signedRequest.headers)) {
      if (typeof value === 'string') {
        fetchHeaders[key] = value;
      } else if (value !== undefined) {
        fetchHeaders[key] = String(value);
      }
    }

    console.log('Making API request:', {
      url,
      method: signedRequest.method,
      headers: fetchHeaders,
      bodyLength: signedRequest.body?.length || 0,
    });

    try {
      const response = await fetch(url, {
        method: signedRequest.method,
        headers: fetchHeaders,
        body: signedRequest.body,
        mode: 'cors',
        credentials: 'omit',
      });

      console.log('API response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(
          `API Request failed: ${response.status} ${response.statusText}. Response: ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log('API response data:', responseData);
      return responseData;
    } catch (error) {
      console.error('Fetch error details:', {
        error,
        message: error instanceof Error ? error.message : String(error),
        url,
        method: signedRequest.method,
      });
      throw error;
    }
  }

  /**
   * POST / Webex Form
   */
  async postWebexForm() {
    try {
      const appCustomer = getGlobalAppCustomer();
      if (!appCustomer || !appCustomer.customer) {
        throw new Error('App Customer data is missing or incomplete');
      }

      const webexFormData: WebexFormData = {
        firstName: appCustomer.customer.firstName,
        lastName: appCustomer.customer.lastName,
        email: appCustomer.customer.email,
        phone: appCustomer.customer.phone,
        group: appCustomer.group,
      };

      const request = this.buildRequest(
        'POST',
        'webex/contactform',
        webexFormData
      );
      const signedRequest = await this.signRequest(request);
      const result = await this.makeRequest(signedRequest);

      console.log('Webex form submitted successfully:', result);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error('Failed to submit Webex form:', error);
      const errorWorkflow = new RaiseErrorWorkflow(
        `Failed to submit Webex form: ${errorMessage}`
      );
      errorWorkflow.execute();
      throw error;
    }
  }
}

export default ApiGatewayClient;
