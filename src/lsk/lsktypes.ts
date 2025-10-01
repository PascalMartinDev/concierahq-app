// LSK Types and Interfaces
// LSK Types:
export type PosData = unknown;

export type PosCallback = (response: PosResponse) => void;


// LSK Interfaces:
export interface PosError {
  message: string;
}

export interface PosResponse {
  error?: PosError;
  data?: PosData;
}

export interface LSKData {
  externalReferences: string[];
  clientCount: number;
  totalAmount: number;
  transactionLines?: TransactionLine[];
  consumer?: Consumer | null;
  profileId?: string | null;
  discounts: string[];
  isDraft: boolean;
  profileName?: string;
  openDate?: string;
  identifier?: string | null;
  paidAmount: number;
  name?: string;
  fiscalIdentifier?: string | null;
  currentInsertionPhase?: number;
  
}


export interface Consumer {
  firstName: string;
  lastName: string;
  phoneNumber1: string;
  email: string;
}

export interface TransactionLine {
  quantity: number;
  parentLine: string | null;
  amount: number;
  modificationDate: string;
  unitAmount: number;
  accountingGroupName: string;
  accountingGroupId: string;
  discounts: string[];
  isDraft: boolean;
  identifier: string;
  itemSku: string;
  text: string;
  itemIdentifier: string;
  creationDate: string;
  fiscalIdentifier: string;
}

export interface ExternalReference {
  reference: string;
  prefix: string;
}

/**
 * DOCUMENTATION: LSK Types and Interfaces
 * 
 * PURPOSE:
 * Comprehensive TypeScript type definitions for Lightspeed K-Series POS
 * integration. Defines data structures, interfaces, and types used for
 * communication between the wine retail web extension and POS system.
 * 
 * CORE TYPES:
 * - PosData: Generic unknown type for flexible POS data handling
 * - PosCallback: Function signature for POS response callbacks
 * 
 * POS RESPONSE SYSTEM:
 * - PosError: Error structure with message field
 * - PosResponse: Standard response format with optional error and data
 * 
 * LSK DATA INTERFACE:
 * Comprehensive transaction and account data structure:
 * - externalReferences: Array of external reference strings
 * - clientCount: Number of clients in transaction
 * - totalAmount: Total transaction amount
 * - transactionLines: Optional array of line items
 * - consumer: Customer information (nullable)
 * - profileId: Customer profile identifier
 * - discounts: Array of applied discount codes
 * - isDraft: Boolean indicating draft status
 * - paidAmount: Amount already paid
 * 
 * CONSUMER INTERFACE:
 * Customer data structure for POS integration:
 * - firstname, lastname: Customer name fields
 * - phoneNumber1: Primary phone contact
 * - email: Email address for communication
 * - Address fields: addressLine1, addressLine2, city, zipCode
 * - identifier: Unique customer identifier
 * 
 * TRANSACTION LINE INTERFACE:
 * Detailed line item structure:
 * - quantity, amount, unitAmount: Quantity and pricing data
 * - parentLine: Hierarchical line relationships
 * - modificationDate, creationDate: Timestamp tracking
 * - accountingGroupName, accountingGroupId: Accounting categorization
 * - discounts: Applied discounts for this line
 * - itemSku, itemIdentifier: Product identification
 * - text: Line item description
 * - fiscalIdentifier: Tax/fiscal tracking
 * 
 * EXTERNAL REFERENCE INTERFACE:
 * Structure for external system references:
 * - reference: The reference value
 * - prefix: Reference type/category prefix
 * 
 * BUSINESS CONTEXT:
 * These types support wine retail operations:
 * - Customer wine club membership management
 * - Discount application for member benefits
 * - Transaction processing with line-item detail
 * - External system integration (CRM, loyalty programs)
 * 
 * INTEGRATION PATTERNS:
 * - POS callback system for asynchronous operations
 * - Error handling with structured error responses
 * - Flexible data typing for various POS operations
 * - Comprehensive customer and transaction modeling
 * 
 * TYPE SAFETY:
 * Ensures compile-time checking for:
 * - POS function arguments and returns
 * - Customer data structure consistency
 * - Transaction line item properties
 * - Error handling patterns
 */

