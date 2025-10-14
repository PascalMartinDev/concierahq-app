import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { getGlobalAppCustomer } from '../../workflow/context/workflowContextInstance';
import { RaiseErrorWorkflow } from '../../workflow/workflows/RaiseErrorWorkflow';
import type { WebexFormData } from './ApiGatewayTypes';

class ApiGateway {
  private static instance: ApiGateway;
  private credentialsProvider: import('@aws-sdk/types').AwsCredentialIdentityProvider;
  private cachedCredentials: import('@aws-sdk/types').AwsCredentialIdentity | null = null;
  private credentialsExpiry: Date | null = null;
  private signer: SignatureV4;
  private apiGatewayId: string;
  private region: string;
  private gatewayStage: string;
  private apiBaseUrl: string;

  private constructor() {
    // Validate required environment variables
    this.apiGatewayId = import.meta.env.VITE_API_GATEWAY_ID;
    this.region = import.meta.env.VITE_AWS_REGION;
    this.gatewayStage = import.meta.env.VITE_API_GATEWAY_STAGE || 'prod';

    if (!this.apiGatewayId) {
      throw new Error('VITE_API_GATEWAY_ID is not defined in environment variables');
    }
    if (!this.region) {
      throw new Error('VITE_AWS_REGION is not defined in environment variables');
    }
    if (!import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID) {
      throw new Error('VITE_COGNITO_IDENTITY_POOL_ID is not defined in environment variables');
    }

    this.apiBaseUrl = `https://${this.apiGatewayId}.execute-api.${this.region}.amazonaws.com/${this.gatewayStage}`;

    // Initialize AWS Cognito credentials provider (created once)
    this.credentialsProvider = fromCognitoIdentityPool({
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
      clientConfig: {
        region: this.region,
      },
    });

    // Initialize AWS SigV4 signer with cached credentials getter
    this.signer = new SignatureV4({
      credentials: async () => this.getCredentials(),
      region: this.region,
      service: 'execute-api',
      sha256: Sha256,
    });

    console.log('ApiGateway initialized:', {
      apiBaseUrl: this.apiBaseUrl,
      region: this.region,
      stage: this.gatewayStage,
    });
  }

  public static getInstance(): ApiGateway {
    if (!ApiGateway.instance) {
      ApiGateway.instance = new ApiGateway();
    }
    return ApiGateway.instance;
  }

  /**
   * Get AWS credentials with caching
   * Credentials are cached and only refreshed when expired
   */
  private async getCredentials(): Promise<import('@aws-sdk/types').AwsCredentialIdentity> {
    const now = new Date();

    // Check if we have valid cached credentials
    if (this.cachedCredentials && this.credentialsExpiry && now < this.credentialsExpiry) {
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
      this.credentialsExpiry = new Date(credentials.expiration.getTime() - 5 * 60 * 1000);
    } else {
      // If no expiration provided, cache for 55 minutes
      this.credentialsExpiry = new Date(now.getTime() + 55 * 60 * 1000);
    }

    console.log('AWS credentials cached until:', this.credentialsExpiry);
    return credentials;
  }

  /**
   * Submit Webex form data to API Gateway
   */
  async submitWebexForm(): Promise<void> {
    try {
      alert('TEST: Starting submitWebexForm');

      // Get customer data
      const appCustomer = getGlobalAppCustomer();
      if (!appCustomer || !appCustomer.customer) {
        throw new Error('App Customer data is missing or incomplete');
      }

      // Prepare form data
      const webexFormData: WebexFormData = {
        firstName: appCustomer.customer.firstName,
        lastName: appCustomer.customer.lastName,
        email: appCustomer.customer.email,
        phone: appCustomer.customer.phone,
        group: appCustomer.group,
      };

      alert(`TEST: Form Data Ready - ${JSON.stringify(webexFormData)}`);

      // Construct the full URL
      const endpoint = '/webex/form';
      const fullUrl = `${this.apiBaseUrl}${endpoint}`;
      const url = new URL(fullUrl);

      alert(`TEST: URL - ${fullUrl}`);

      // Prepare request body
      const requestBody = JSON.stringify(webexFormData);

      // Create HTTP request for signing
      const request = new HttpRequest({
        method: 'POST',
        protocol: url.protocol,
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        headers: {
          'Content-Type': 'application/json',
          'host': url.hostname,
        },
        body: requestBody,
      });

      alert('TEST: Request created, signing...');

      // Sign the request with AWS SigV4
      const signedRequest = await this.signer.sign(request);

      alert('TEST: Request signed successfully');

      // Convert headers to fetch-compatible format
      const fetchHeaders: Record<string, string> = {};
      for (const [key, value] of Object.entries(signedRequest.headers)) {
        if (typeof value === 'string') {
          fetchHeaders[key] = value;
        } else if (value !== undefined) {
          fetchHeaders[key] = String(value);
        }
      }

      alert(`TEST: Making fetch request to ${fullUrl}`);

      // Make the API call
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: fetchHeaders,
        body: requestBody,
      });

      alert(`TEST: Response received - Status: ${response.status}`);

      // Parse response
      const responseData = await response.text();

      if (!response.ok) {
        throw new Error(
          `API Request failed: ${response.status} ${response.statusText}. Response: ${responseData}`
        );
      }

      alert(`TEST: Success! Response: ${responseData}`);
      console.log('Webex form submitted successfully:', responseData);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('ApiGateway submitWebexForm error:', error);
      alert(`TEST: ERROR - ${errorMessage}`);

      const errorWorkflow = new RaiseErrorWorkflow(
        `ApiGateway submitWebexForm failed: ${errorMessage}`
      );
      errorWorkflow.execute();

      throw error;
    }
  }
}


export default ApiGateway;