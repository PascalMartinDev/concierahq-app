import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { getGlobalAppCustomer } from '../../workflow/context/workflowContextInstance';
import { RaiseErrorWorkflow } from '../../workflow/workflows/RaiseErrorWorkflow';
import type { WebexFormData } from './ApiGatewayTypes';


class ApiGateway {
  private static instance: ApiGateway;
  private credentials: import('@aws-sdk/types').AwsCredentialIdentityProvider;
  private signer: SignatureV4;
  private apiGatewayId: string;
  private region: string;
  private gatewayStage: string;
  private apiBaseUrl: string;

  private constructor() {
    this.apiGatewayId = import.meta.env.VITE_API_GATEWAY_ID;
    this.region = import.meta.env.VITE_AWS_REGION;
    this.gatewayStage = import.meta.env.VITE_API_GATEWAY_STAGE;
    this.apiBaseUrl = `https://${this.apiGatewayId}.execute-api.${this.region}.amazonaws.com/${this.gatewayStage}`;
	  this.credentials = fromCognitoIdentityPool({
	    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
	  });
	
	  this.signer = new SignatureV4({
      credentials: this.credentials,
      region: import.meta.env.VITE_AWS_REGION,
      service: 'execute-api',
      sha256: Sha256,
    });
  }

  public static getInstance(): ApiGateway {
	if (!ApiGateway.instance) {
	  ApiGateway.instance = new ApiGateway();
	}
	return ApiGateway.instance;
  }

  //API Gateway Methods:
  // WebexForm Submission:
  async submitWebexForm(): Promise<void> {
    try { 
      const appCustomer = getGlobalAppCustomer();
      if (!appCustomer || !appCustomer.customer) {
        throw new Error('App Customer data is missing or incomplete');
      }

      // Webex Form Data from AppCustomer:
      const webexFormData: WebexFormData = {
        firstName: appCustomer.customer.firstName,
        lastName: appCustomer.customer.lastName,
        email: appCustomer.customer.email,
        phone: appCustomer.customer.phone,
        group: appCustomer.group
      }

      // Generate URL:
      const url = new URL('/webex/form', this.apiBaseUrl);

      // Generate Request:
      const request = new HttpRequest({
        method: 'POST',
        hostname: url.hostname,
        path: url.pathname,
        headers: {
		      'Content-Type': 'application/json',
        },
        body: JSON.stringify(webexFormData),
      });

      // Sign the request with AWS Credentials:
      const signedRequest = await this.signer.sign(request);

      // Make the API Call:
      const response = await fetch(url.toString(), {
        method: signedRequest.method,
        headers: signedRequest.headers,
        body: signedRequest.body,
      });

      if(!response.ok) throw new Error(`API Request failed: ${response.status} ${response.statusText}`); 

     } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorWorkflow = new RaiseErrorWorkflow(`ApiGateway submitWebexForm failed: ${errorMessage}`);
      errorWorkflow.execute();
     }

  }
}


export default ApiGateway;