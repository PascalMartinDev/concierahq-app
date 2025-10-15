import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';

// Types
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface WebexFormData {
  customerName: string;
  email: string;
  phoneNumber: string;
  orderDetails: string;
  preferences?: string;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  message: string;
}

export interface WebexFormResponse {
  success: boolean;
  message: string;
  form_id: string;
  data: WebexFormData & { timestamp: string };
}

class AuthenticationAPIClient {
  private static instance: AuthenticationAPIClient;
  private signer: SignatureV4;
  private readonly baseUrl = 'https://fmi5zd0pyg.execute-api.us-east-1.amazonaws.com/prod';
  private readonly region: string;
  private readonly identityPoolId: string;

  private constructor() {
    // Get environment variables
    this.region = import.meta.env.VITE_AWS_REGION;
    this.identityPoolId = import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID;

    if (!this.region || !this.identityPoolId) {
      throw new Error(
        'Missing required environment variables: VITE_AWS_REGION and VITE_COGNITO_IDENTITY_POOL_ID'
      );
    }

    console.log(`🔧 Initializing API client with region: ${this.region}`);
    console.log(`🔧 Identity Pool ID: ${this.identityPoolId}`);

    // Initialize Cognito Identity credentials
    const credentials = fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: this.region }),
      identityPoolId: this.identityPoolId,
    });

    // Initialize AWS Signature V4 signer
    this.signer = new SignatureV4({
      credentials,
      region: this.region,
      service: 'execute-api',
      sha256: Sha256,
    });
  }

  public static getInstance(): AuthenticationAPIClient {
    if (!AuthenticationAPIClient.instance) {
      AuthenticationAPIClient.instance = new AuthenticationAPIClient();
    }
    return AuthenticationAPIClient.instance;
  }

  private async makeRequest<T = unknown>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body?: unknown,
    additionalHeaders: Record<string, string> = {}
  ): Promise<APIResponse<T>> {
    try {
      const url = new URL(endpoint, this.baseUrl);
      
      console.log(`🚀 Making authenticated ${method} request to: ${url.toString()}`);

      const request = new HttpRequest({
        method,
        hostname: url.hostname,
        path: url.pathname + url.search,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...additionalHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      // Sign the request with AWS Signature V4
      const signedRequest = await this.signer.sign(request);
      
      console.log('📋 Request headers:', Object.keys(signedRequest.headers));

      // Make the HTTP request
      const response = await fetch(url.toString(), {
        method: signedRequest.method,
        headers: signedRequest.headers,
        body: signedRequest.body,
      });

      console.log(`📡 Response status: ${response.status}`);

      // Handle response
      let responseData: unknown;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log('📦 Response data:', responseData);

      if (response.ok) {
        return {
          success: true,
          data: responseData as T,
          statusCode: response.status,
        };
      } else {
        const errorMessage = typeof responseData === 'object' && responseData !== null && 'message' in responseData
          ? (responseData as { message: string }).message
          : `HTTP ${response.status}: ${response.statusText}`;

        return {
          success: false,
          error: errorMessage,
          data: responseData as T,
          statusCode: response.status,
        };
      }
    } catch (error) {
      console.error('❌ API request failed:', error);
      
      if (error instanceof Error) {
        // Check for specific error types
        if (error.message.includes('CORS')) {
          return {
            success: false,
            error: 'CORS error - Check API Gateway CORS configuration',
            statusCode: 0,
          };
        }
        
        if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          return {
            success: false,
            error: 'Network error - Check your internet connection and API endpoint',
            statusCode: 0,
          };
        }

        return {
          success: false,
          error: error.message,
          statusCode: 0,
        };
      }

      return {
        success: false,
        error: 'Unknown error occurred',
        statusCode: 0,
      };
    }
  }

  // Test authentication by getting credentials
  public async testAuthentication(): Promise<APIResponse<{ identityId: string; region: string }>> {
    try {
      console.log('🔐 Testing Cognito Identity Pool authentication...');
      
      // Get credentials to test authentication
      const credentials = fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: this.region }),
        identityPoolId: this.identityPoolId,
      });

      const creds = await credentials();
      
      if (creds.accessKeyId) {
        console.log('✅ Authentication successful');
        return {
          success: true,
          data: {
            identityId: creds.sessionToken ? 'authenticated' : 'unauthenticated',
            region: this.region,
          },
        };
      } else {
        return {
          success: false,
          error: 'Failed to obtain credentials from Cognito Identity Pool',
        };
      }
    } catch (error) {
      console.error('❌ Authentication test failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  }

  // Health check endpoint
  public async healthCheck(): Promise<APIResponse<HealthCheckResponse>> {
    return this.makeRequest<HealthCheckResponse>('GET', '/health');
  }

  // Submit Webex form
  public async submitWebexForm(formData: WebexFormData): Promise<APIResponse<WebexFormResponse>> {
    const dataWithTimestamp = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    return this.makeRequest<WebexFormResponse>('POST', '/webex/contactform', dataWithTimestamp);
  }

  // Generic GET request
  public async get<T = unknown>(endpoint: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>('GET', endpoint);
  }

  // Generic POST request
  public async post<T = unknown>(endpoint: string, data: T): Promise<APIResponse<T>> {
    return this.makeRequest<T>('POST', endpoint, data);
  }

  // Generic PUT request
  public async put<T = unknown>(endpoint: string, data: T): Promise<APIResponse<T>> {
    return this.makeRequest<T>('PUT', endpoint, data);
  }

  // Generic DELETE request
  public async delete<T = unknown>(endpoint: string): Promise<APIResponse<T>> {
    return this.makeRequest<T>('DELETE', endpoint);
  }

  // Get current configuration
  public getConfig() {
    return {
      baseUrl: this.baseUrl,
      region: this.region,
      identityPoolId: this.identityPoolId,
    };
  }
}

export default AuthenticationAPIClient;
