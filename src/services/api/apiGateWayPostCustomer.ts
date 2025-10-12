import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { getGlobalAppCustomer } from '../../workflow/context/workflowContextInstance';
import { RaiseErrorWorkflow } from '../../workflow/workflows/RaiseErrorWorkflow';

// Customer Data type for api call:
type customerData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  group: string;
  state?: string;
  postcode?: string;
}

// apiGateway Post / Customer API Call function:
const apiGatewayPostCustomer = async () => {
  const region = import.meta.env.VITE_AWS_REGION;
  const service = 'execute-api';
  const apiGatewayID = import.meta.env.VITE_API_GATEWAY_ID
  
  try {
    // Get AWS Credentials from Cognito Identity Pool:
    const credentials = fromCognitoIdentityPool({
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
      // No login properties = unauthenticated access via AWS Identity Pool ID
    });

    // Create Signature:
    const signaturev4 = new SignatureV4 ({
      credentials,
      region,
      service,
      sha256: Sha256
    })

    // Prepare customerData:
    const appCustomer = getGlobalAppCustomer();
    if (!appCustomer || !appCustomer.customer) {
      const errorWorkflow = new RaiseErrorWorkflow('App customer data is missing or incomplete');
      errorWorkflow.execute();
      return;
    }
    
    const appCustomerData: customerData = {
      firstName: appCustomer.customer.firstName,
      lastName: appCustomer.customer.lastName,
      email: appCustomer.customer.email,
      phone: appCustomer.customer.phone,
      group: appCustomer.group,
      state: appCustomer.customer.address.state || '',
      postcode: appCustomer.customer.address.postcode || '',
    }

    // Prepare body payload
    const body = JSON.stringify(appCustomerData);

    // Prepare request:
    const request = {
      method: 'POST',
      protocol: 'https:' as const,
      hostname: `${apiGatewayID}.${service}.${region}.amazonaws.com`,
      path: '/prod/webex/form',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'host': `${apiGatewayID}.${service}.${region}.amazonaws.com`,
      },
      body
    };

    // Sign the Request:
    const signedRequest = await signaturev4.sign(request);

    // Make the API call:
    const response = await fetch(
      `${signedRequest.protocol}//${signedRequest.hostname}${signedRequest.path}`,
      {
        method: signedRequest.method,
        headers: signedRequest.headers,
        body: signedRequest.body,
      }
    );

    // Handle respsonse:
    if (!response.ok) {
      const errorWorkflow = new RaiseErrorWorkflow(`HTTP error! status: ${response.status}`);
      errorWorkflow.execute();
      return;
    }

    const result = await response.json();
    console.log('API Response', result);
    return;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorWorkflow = new RaiseErrorWorkflow(`Failed to POST customer information to API: ${errorMessage}`);
    errorWorkflow.execute();
  }
}

export default apiGatewayPostCustomer;


/**
 * API Gateway Post Customer Function Flow:
 * 
 * 1. Setup AWS Configuration:
 *    - Gets AWS region, service, and API Gateway ID from environment variables
 *    - Creates AWS credentials using Cognito Identity Pool for temporary, rotating credentials
 * 
 * 2. Create AWS Signature:
 *    - Creates SignatureV4 instance for AWS request signing
 *    - Uses execute-api service and SHA256 hashing
 * 
 * 3. Prepare Customer Data:
 *    - Retrieves global AppCustomer instance from workflow context
 *    - Validates customer data exists
 *    - Maps AppCustomer fields to customerData type for API payload
 * 
 * 4. Build and Sign Request:
 *    - Creates HTTP request object with POST method, headers, and JSON body
 *    - Signs the request using AWS SignatureV4 for authentication
 * 
 * 5. Execute API Call:
 *    - Makes signed HTTP POST request to API Gateway endpoint
 *    - Endpoint: https://{apiGatewayID}.execute-api.{region}.amazonaws.com/prod/customer
 * 
 * 6. Handle Response:
 *    - Checks response status and throws error if not OK
 *    - Parses JSON response and logs result
 *    - Returns successfully or throws error for upstream handling
 * 
 * Dependencies:
 * - Requires VITE_AWS_REGION, VITE_API_GATEWAY_ID, and VITE_COGNITO_IDENTITY_POOL_ID
 *   environment variables
 * - Uses global AppCustomer from workflow context
 * - IAM Role attached to Cognito Identity Pool must have execute-api:Invoke permission
 */