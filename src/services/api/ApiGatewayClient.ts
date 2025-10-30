import { getGlobalAppCustomer } from '../../workflow/context/workflowContextInstance';
import { RaiseErrorWorkflow } from '../../workflow/workflows/RaiseErrorWorkflow';
import type { RequestInformation, WebexFormData, CreditCardUpdateData } from './ApiGatewayTypes';

class ApiGatewayClient {
  private static instance: ApiGatewayClient;
  private region: string;
  private apiGatewayId: string;
  private stage: string;
  private apiKey: string;
  private headers: HeadersInit;
  private baselineUrl: string;
  

  private constructor() {
    // Set required environment variables
    this.region = import.meta.env.VITE_AWS_REGION;
    this.apiGatewayId = import.meta.env.VITE_API_GATEWAY_ID;
    this.stage = import.meta.env.VITE_API_GATEWAY_STAGE;
    this.apiKey = import.meta.env.VITE_API_GATEWAY_API_KEY;
    this.baselineUrl = `https://${this.apiGatewayId}.execute-api.${this.region}.amazonaws.com/${this.stage}/`;
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    };
  }

  public static getInstance(): ApiGatewayClient {
    if (!ApiGatewayClient.instance) {
      ApiGatewayClient.instance = new ApiGatewayClient();
    }
    return ApiGatewayClient.instance;
  }
  /*** Make the HTTP request ***/
  private async makeRequest(requestInformation: RequestInformation) {
      const url = `${this.baselineUrl}${requestInformation.pathway}`;
      const parameters = {
        method: requestInformation.method,
        headers: this.headers,
        body: requestInformation.body ? JSON.stringify(requestInformation.body) : undefined,
      }
    
    try {
      const response = await fetch(url, parameters);

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
        
      });
      throw error;
    }
  }

  /**
   * POST / Webex Form
   */
  async postWebexForm(): Promise<void> {
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

      const endpoint = 'webex/customerform';
      console.log('Calling endpoint:', endpoint);
      const requestInformation: RequestInformation = {
        pathway: endpoint,
        method: 'POST',
        body: webexFormData,
      };

      const result = await this.makeRequest(requestInformation);
      console.log('Webex form submitted successfully:', result);
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

  /**
   * POST / CreditCardUpdate
   */
  async postCreditCardUpdate(): Promise<void> {
    try {
      const appCustomer = getGlobalAppCustomer();
      if (!appCustomer || !appCustomer.customer) {
        throw new Error('App Customer data is missing or incomplete');
      }

      const creditCardUpdateData: CreditCardUpdateData = {
        email: appCustomer.customer.email
      };

      const endpoint = 'webex/creditcard/update';
      console.log('Calling endpoint:', endpoint);
      const requestInformation: RequestInformation = {
        pathway: endpoint,
        method: 'POST',
        body: creditCardUpdateData,
      };

      const result = await this.makeRequest(requestInformation);
      console.log('Webex form submitted successfully:', result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error('Failed to send Credit Card Update:', error);
      const errorWorkflow = new RaiseErrorWorkflow(
        `Failed to submit Webex form: ${errorMessage}`
      );
      errorWorkflow.execute();
      throw error;
    }
  }
}

export default ApiGatewayClient;
