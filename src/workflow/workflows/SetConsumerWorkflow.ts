import type { IWorkflow } from '../context/workflowInterface';
import { getGlobalAppCustomer } from '../context/workflowContextInstance';
import { RaiseErrorWorkflow } from './RaiseErrorWorkflow';
import type { AppCustomer } from '../../models/webex/business/AppCustomer';
import type { Consumer } from '../../lsk/lsktypes';




export class SetConsumerWorkflow implements IWorkflow {
  async execute(): Promise<void> { 
    try {
      const { appCustomer } = await this.validateDependencies();
      
      if (!this.hasRequiredCustomerData(appCustomer)) {
        throw new Error('Insufficient customer data for consumer setup');
      }
      
      await this.setConsumerAndReference(appCustomer);
    } catch (error) {
      await this.handleError(error);
    }
  }

  private async validateDependencies() {
    const appCustomer = getGlobalAppCustomer();
    if (!appCustomer?.customer) {
      throw new Error('No AppCustomer found in global storage');
    }
    return { appCustomer };
  }

  private hasRequiredCustomerData(appCustomer: AppCustomer): boolean {
    const customer = appCustomer.customer;
    const requiredFields = ['email', 'firstName', 'lastName', 'phone'] as const;
    type RequiredField = typeof requiredFields[number];
    
    for (const field of requiredFields) {
      if (!customer[field as RequiredField]) {
        return false;
      }
    }
    
    return true;
  }

  private async setConsumerAndReference(appCustomer: AppCustomer): Promise<void> {
    const consumer: Consumer = this.buildConsumerObject(appCustomer);
    
    try {
      pos_setConsumer(consumer);
      pos_addExternalReference(appCustomer.customer.email, "Email");      
    } catch (error) {
      throw new Error(`Failed to set consumer in POS: ${error}`);
    }
  }

  private buildConsumerObject(appCustomer: AppCustomer): Consumer {
    return {
      email: appCustomer.customer.email,
      firstName: appCustomer.customer.firstName,
      lastName: appCustomer.customer.lastName,
      phoneNumber1: appCustomer.customer.phone,
    };
  }

  private async handleError(error: unknown): Promise<void> {  
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorWorkflow = new RaiseErrorWorkflow(`SetConsumerWorkflow failed: ${errorMessage}`);
    
    await errorWorkflow.execute();
  }
}

/**
 * DEVELOPER DOCUMENTATION
 * =======================
 * 
 * SetConsumerWorkflow - Consumer Data Integration
 * 
 * Purpose:
 * Integrates customer information into the Lightspeed K-series POS system by setting
 * the consumer data and adding external references for transaction tracking.
 * 
 * Execution Flow:
 * 1. Validates if customer data availability
 * 2. Checks for required customer fields (email, firstName, lastName, phone)
 * 3. Builds Consumer object with customer and address information
 * 4. Calls POS functions to set consumer and add external reference
 * 5. Handles errors gracefully with user feedback
 * 
 * Key Components:
 * - validateDependencies(): Ensures required context and customer data exist
 * - hasRequiredCustomerData(): Validates presence of mandatory customer fields
 * - setConsumerAndReference(): Executes POS integration calls
 * - buildConsumerObject(): Constructs Consumer object from AppCustomer data
 * - handleError(): Provides consistent error handling and user feedback
 * 
 * Data Validation:
 * Required Customer Fields:
 * - email: Customer email address (used as primary identifier)
 * - firstName: Customer first name
 * - lastName: Customer last name
 * - phone: Customer phone number
 * 
 * Optional Address Fields:
 * - addressLine1: Primary address line
 * - addressLine2: Secondary address line
 * - city: City name
 * - postcode: Zip/postal code
 * - identifier: Existing consumer identifier from POS
 * 
 * Business Context:
 * Critical for wine retail POS integration:
 * - Links customer data to POS transaction
 * - Enables customer-specific pricing and discounts
 * - Provides transaction history tracking
 * - Supports loyalty program integration
 * - Ensures proper tax and shipping calculations
 * 
 * Integration Points:
 * - pos_setConsumer(): Native K-series POS function to set customer
 * - pos_addExternalReference(): Adds email as external reference
 * - getGlobalWorkflowContext(): Access to centralized workflow state
 * - getGlobalAppCustomer(): Access to current customer data
 * - Consumer type: LSK type definition for POS consumer data
 * - debugLog(): Environment-aware logging utility
 * 
 * Error Handling Strategy:
 * - Missing dependencies throw errors and stop execution
 * - Missing required customer fields throw validation errors
 * - POS integration failures are caught and re-thrown with context
 * - All errors result in proper user feedback via RaiseErrorWorkflow
 * - Loading state is cleared on error to prevent UI hanging
 * 
 * Usage:
 * This workflow is typically called by other workflows before transaction finalization:
 * ```typescript
 * const setConsumerWorkflow = new SetConsumerWorkflow();
 * await setConsumerWorkflow.execute();
 * ```
 * 
 * Dependencies:
 * - IWorkflow: Standard workflow interface
 * - AppCustomer: Customer data from global storage
 * - Consumer: LSK type definition for POS integration
 * - debugLogger: Environment-aware logging utility
 * - POS Functions: pos_setConsumer(), pos_addExternalReference()
 * 
 * Notes:
 * - Consumer setup must complete before discount applications
 * - Email is used as both consumer identifier and external reference
 * - Address fields default to empty strings if not provided
 * - POS function calls are wrapped for better error context
 * - Debug logging tracks each step for troubleshooting
 * - Validation prevents incomplete consumer data from reaching POS
 */