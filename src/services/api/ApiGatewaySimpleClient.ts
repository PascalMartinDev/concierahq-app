import type { APIResponse, WebexFormData } from './ApiGatewayTypes';
import { getGlobalAppCustomer } from '../../workflow/context/workflowContextInstance';

class ApiGatewaySimpleClient {
  private static instance: ApiGatewaySimpleClient;
  private readonly baseUrl: string =
    'https://fmi5zd0pyg.execute-api.us-east-1.amazonaws.com/prod/webex/contactform';

  private constructor() {}
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
      const url = `${this.baseUrl}${endpoint}`;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...additionalHeaders,
      };

      console.log(`🚀 Making ${method} request to: ${url}`);
      if (body) console.log('📤 Request body:', body);

      const requestOptions: RequestInit = {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      };

      const response = await fetch(url, requestOptions);

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
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          message:
            typeof responseData === 'string'
              ? responseData
              : (typeof responseData === 'object' && responseData !== null && 'message' in responseData
                  ? (responseData as { message?: string }).message
                  : undefined),
          statusCode: response.status
        };
      }

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
    const path = '';

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
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to submit Webex form'
      };
    }
  }
}

export default ApiGatewaySimpleClient;
