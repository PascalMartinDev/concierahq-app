// Database record interfaces:
// Customer interfaces:
export interface CustomerMembership {
  groups?: string;
  wine_club_first_joined_date?: string;
  last_order_items?: string;
  is_vip?: string;
  pos_last_visit_date?: string;
}

// Customer Address Interface
export interface CustomerAddress {
  street?: string;
  city?: string;
  customer_state?: string;
  postcode?: string;
}

// Core Customer Record interface:
export interface CustomerRecord extends CustomerAddress, CustomerMembership {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

// Interface for Pricing Matrix strategy:
export interface ProductPriceRecord {
  sku: string;
  discount_GROUP1: string;
  discount_GROUP2: string;
  discount_GROUP3: string;
  discount_GROUP4: string;
}

export const DYNAMODB_TABLE_CONFIG = {
  CUSTOMER: {
    tableName: import.meta.env.VITE_DB_TABLE_CUSTOMER,
    partitionKey: 'email'
  },
  PRODUCT: {
    tableName: import.meta.env.VITE_DB_TABLE_PRICE_MATRIX,
    partitionKey: 'sku' 
  }
} as const;


export const createDynamoDBItem = (
  tableKey: keyof typeof DYNAMODB_TABLE_CONFIG,
  keyValue: string
) => ({
  tableName: DYNAMODB_TABLE_CONFIG[tableKey].tableName,
  partitionKey: DYNAMODB_TABLE_CONFIG[tableKey].partitionKey,
  keyValue  
})

