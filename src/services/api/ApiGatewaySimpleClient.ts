import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import type { APIResponse, WebexFormData } from './ApiGatewayTypes';
import { getGlobalAppCustomer } from '../../workflow/context/workflowContextInstance';

class ApiGatewaySimpleClient {
  private static instance: ApiGatewaySimpleClient;
  private credentials: import('@aws-sdk/types').AwsCredentialIdentityProvider;
  private signer: SignatureV4;
  private readonly region: string;
  private readonly apiGatewayId: string;
  private readonly baseUrl: string;
  //'https://fmi5zd0pyg.execute-api.us-east-1.amazonaws.com/prod/webex/contactform';

  private constructor() {
    // Get Identity Pool ID
    const identityPoolId = import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID;
    this.region = import.meta.env.VITE_AWS_REGION;
    console.log('TEST:', this.region);
    this.apiGatewayId = import.meta.env.VITE_API_GATEWAY_ID;
    this.baseUrl = `https://${this.apiGatewayId}.execute-api.${this.region}.amazonaws.com/prod/`;
    console.log('TEST: BASE URL:', this.baseUrl);
    this.credentials = fromCognitoIdentityPool({
      identityPoolId: identityPoolId,
      clientConfig: {
        region: this.region,
      },
    });
    this.signer = new SignatureV4({
      credentials: this.credentials,
      region: this.region,
      service: 'execute-api',
      sha256: Sha256,
    });
  }

  // Singleton Instance
  public static getInstance(): ApiGatewaySimpleClient {
    if (!ApiGatewaySimpleClient.instance) {
      ApiGatewaySimpleClient.instance = new ApiGatewaySimpleClient();
    }
    return ApiGatewaySimpleClient.instance;
  }

  // API Call Method makeRequest:
  private async makeRequest<T = unknown>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body?: object,
    additionalHeaders: Record<string, string> = {}
  ): Promise<APIResponse<T>> {
    try {
      const url = new URL(endpoint, this.baseUrl);
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...additionalHeaders,
      };

      console.log(`🚀 Making ${method} request to: ${url}`);
      if (body) console.log('📤 Request body:', body);

      //Create the Http Request
      const request = new HttpRequest({
        method,
        hostname: url.hostname,
        path: url.pathname + url.search,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      // Sign the request with AWS Credentails:
      const signedRequest = await this.signer.sign(request);

      // Make Authenticated Request:
      const response = await fetch(url.toString(), {
        method: signedRequest.method,
        headers: signedRequest.headers,
        body: signedRequest.body,
      });

      console.log(
        `📡 Response status: ${response.status} ${response.statusText}`
      );

      let responseData: object | string | null;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        console.error('❌ API Error:', responseData);
        if (response.status === 403) {
          return {
            success: false,
            error:
              'Access Denied - Check your Cognito Identity Pool permissions',
            message: 'Your app is not authorized to access this API',
            statusCode: response.status,
          };
        } else if (response.status === 401) {
          return {
            success: false,
            error: 'Unauthorized - Authentication failed',
            message: 'Failed to authenticate with Cognito Identity Pool',
            statusCode: response.status,
          };
        } else {
          return {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
            message:
              typeof responseData === 'string'
                ? responseData
                : typeof responseData === 'object' &&
                  responseData !== null &&
                  'message' in responseData
                ? (responseData as { message?: string }).message
                : undefined,
            statusCode: response.status,
          };
        }
      }

      // Success API Response:
      console.log('✅ API Success:', responseData);
      return {
        success: true,
        data: responseData as T,
        statusCode: response.status,
      };
    } catch (error) {
      console.error('🔥 Request failed:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Network error occurred',
        message: 'Failed to connect to the API',
      };
    }
  }

  // WebexForm Submission;
  public async postWebexForm(): Promise<APIResponse<unknown>> {
    const method = 'POST';
    const path = 'webex/contactform';

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

      const response = await this.makeRequest(method, path, webexFormData);
      return response;
    } catch (error) {
      console.error('Failed to submit Webex form:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to submit Webex form',
      };
    }
  }
}

export default ApiGatewaySimpleClient;
