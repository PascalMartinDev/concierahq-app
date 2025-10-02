import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

class DynamoDBClientSingleton {
  private static instance: DynamoDBClient;

  private constructor() {}

  public static getInstance(): DynamoDBClient {
    if (!DynamoDBClientSingleton.instance) {
      DynamoDBClientSingleton.instance = new DynamoDBClient({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: fromCognitoIdentityPool({
          identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
          // No Login properties = unauthenticated access via AWS Identity Pool ID
        }),
      });
    }
    return DynamoDBClientSingleton.instance;
  }
}

export default DynamoDBClientSingleton;


