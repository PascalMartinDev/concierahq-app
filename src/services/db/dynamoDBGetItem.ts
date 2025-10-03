import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall} from '@aws-sdk/util-dynamodb';
import DynamoDBClientSingleton from './dynamoDBClientSingleton';
//import { RaiseErrorWorkflow } from '../../workflow/workflows/RaiseErrorWorkflow';

// Dynamodb Item Request interface:
export interface DynamoDBItem {
  tableName: string;
  partitionKey: string;
  keyValue: string;
}

// Get Instance of DynamoDB Client connection:
const client = DynamoDBClientSingleton.getInstance();

// Function to get item from DynamoBD:
const dynamoDBGetItem = async <T extends object>(item: DynamoDBItem): Promise<T | null> => {
  try {
    // AWS-SDK DynamoDB Get Item Command:
    const key = marshall({[item.partitionKey]: item.keyValue});    
    const command = new GetItemCommand({
      TableName: item.tableName,
      Key: key,
    })
    
    // DynamodDB response:
    const response = await client.send(command);
    // If Item Found return response Item:
    if(response.Item) {
      return unmarshall(response.Item) as T;
    }
    return null;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('TEST: DynamoDB Get Item Error:', errorMessage);
    //const errorWorkflow = new RaiseErrorWorkflow(`DynamoDB Error: ${errorMessage}`);
    //errorWorkflow.execute();
    return null;
  }
};

export default dynamoDBGetItem;

