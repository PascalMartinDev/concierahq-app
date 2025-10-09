import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import DynamoDBClientSingleton from './dynamoDBClientSingleton';
import { RaiseErrorWorkflow } from '../../workflow/workflows/RaiseErrorWorkflow';

// Get Instance of DynamoDB Client connection:
const client = DynamoDBClientSingleton.getInstance();

interface ICustomerSearchConfiguration {
  indexName: string;
  partitionKey: string;
  sortKey: string;
  projectedAttrs?: string[];
}

// Customer search query types
export type CustomerSearchType = 'email' | 'phone' | 'name';

// Lookup map for DynamoDB Global Search Index's:
const searchIndexes: Record<CustomerSearchType, ICustomerSearchConfiguration> =
  {
    email: {
      indexName: 'EmailSearchIndex',
      partitionKey: 'search_pk',
      sortKey: 'email_search',
      projectedAttrs: ['email', 'first_name', 'last_name', 'phone'],
    },
    name: {
      indexName: 'NameSearchIndex',
      partitionKey: 'search_pk',
      sortKey: 'name_search',
      projectedAttrs: ['email', 'first_name', 'last_name', 'phone'],
    },
    phone: {
      indexName: 'PhoneSearchIndex',
      partitionKey: 'search_pk',
      sortKey: 'phone_search',
      projectedAttrs: ['email', 'first_name', 'last_name', 'phone'],
    },
  };

// Interface for Search Query
export interface CustomerSearchQuery {
  queryType: CustomerSearchType;
  queryValue: string;
}

// Interface for customer search result
export interface CustomerSearchResult {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// Function to get items from DynamoDB:
const dynamoDBSearchCustomer = async (
  query: CustomerSearchQuery
): Promise<CustomerSearchResult[]> => {
  try {
    // Get search configuration for the query type
    const searchConfig = searchIndexes[query.queryType];

    // AWS-SDK DynamoDB Search Item Command:
    const command = new QueryCommand({
      TableName: import.meta.env.VITE_DB_TABLE_CUSTOMER,
      IndexName: searchConfig.indexName,
      KeyConditionExpression: `search_pk = :pk AND begins_with(${searchConfig.sortKey}, :prefix)`,
      ExpressionAttributeValues: marshall({
        ':pk': 'CUSTOMER', // All records must have this constant partition key value
        ':prefix': query.queryValue.toLowerCase(),
      }),
      Limit: 5, // Limit to top 5 results
      ScanIndexForward: true, // Ascending order
    });

    // DynamoDB response:
    const response = await client.send(command);

    // If Items Found, map and ensure required properties exist:
    if (response.Items && response.Items.length > 0) {
      return response.Items.map((item) => {
        const unmarshalled = unmarshall(item);
        return {
          first_name: unmarshalled.first_name || '',
          last_name: unmarshalled.last_name || '',
          email: unmarshalled.email || '',
          phone: unmarshalled.phone || '',
        };
      });
    }

    // Return empty array if no items found
    return [];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('TEST: DynamoDB Search Error:', errorMessage);
    const errorWorkflow = new RaiseErrorWorkflow(`DynamoDB Error: ${errorMessage}`);
    errorWorkflow.execute();
    return [];
  }
};

export default dynamoDBSearchCustomer;

