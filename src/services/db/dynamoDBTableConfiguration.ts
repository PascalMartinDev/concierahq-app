// Database record interfaces:
// Customer interfaces:
export interface CustomerRecord {
  crm_customer_id?: string;
  customer_id?: number;
  email: string;
  email_status?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  group?: string;
  tags?: string[];
  address: ICustomerAddress;
  booking: IBooking;
  commerce_seven: ICommerceSeven;
  ecommerce: IeCommerce;
}

export interface ICustomerAddress {
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

export interface IBooking {
  booking_date_time?: string;
  booking_duration?: number;
  booking_is_vip?: string;
  booking_notes?: string;
  booking_no_people?: number;
  booking_service_name?: string;
  booking_status?: string;
  booking_table_name_number?: string;
  booking_table_section?: string;
  booking_tags_list?:string[];
}

export interface ICommerceSeven {
  clubs?: string[];
  flags?: string[];
  groups?: string[];
}

export interface IeCommerce {
  e_commerce_customer_id?: string;
  subscription: ISubscription;
}

export interface ISubscription {
  next_subscription_date?: string;
  subscription_cancelled_date?: string;
  subscription_joined_date?: string;
  subscription_status?: string;
  subscription_level?: string;
}



// Interface for Pricing Matrix strategy:
export interface IProductPriceRecord {
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

