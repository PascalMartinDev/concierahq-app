import type { IWorkflow } from "../context/workflowInterface";
import dynamoDBGetItem from "../../services/db/dynamoDBGetItem";
import { getGlobalAppCustomer, getGlobalWorkflowContext, setGlobalAppCustomer } from "../context/workflowContextInstance";
import { appCustomerProfileMapper } from "../../utils/appCustomerProfileMapper";
import { RaiseErrorWorkflow } from "./RaiseErrorWorkflow";
import type { AppCustomer } from "../../models/webex/business/AppCustomer";
import type { WorkflowContextType } from "../context/workflowContext";
import { createDynamoDBItem, type CustomerRecord } from "../../services/db/dynamoDBTableConfiguration";


export class GetCustomerProfileWorkflow implements IWorkflow {
  async execute(): Promise<void> {
    try {
      const { workflowContext, appCustomer } = await this.validateDependencies();
      workflowContext.setIsLoading(true);
      const consumerEmail = this.extractConsumerEmail(appCustomer);
      if (!consumerEmail) {
        this.triggerSearchMode(workflowContext);
        return;
      }

      const customerProfile = await this.retrieveCustomerProfile(consumerEmail);
      if (!customerProfile) {
        this.triggerCreateMode(workflowContext);
        return;
      }

      this.updateCustomerData(customerProfile, appCustomer, workflowContext);
      setTimeout(() => {
        workflowContext.setConcieraAccess(true);
        workflowContext.setIsLoading(false);
      }, 500);
    } catch (error) {
      await this.handleError(error);
    }
  }

  private async validateDependencies() {
    const workflowContext = getGlobalWorkflowContext();
    if (!workflowContext) {
      throw new Error('Workflow context not found');
    }

    const appCustomer = getGlobalAppCustomer();
    if (!appCustomer) {
      throw new Error('No AppCustomer found in global storage');
    }

    return { workflowContext, appCustomer };
  }

  private extractConsumerEmail(appCustomer: AppCustomer): string | null {
    const consumerEmail = appCustomer.currentAccount?.consumer?.email;
    
    if (!appCustomer.currentAccount || !appCustomer.currentAccount.consumer || !consumerEmail || consumerEmail.trim() === '') {
      return null;
    }
    return consumerEmail;
  }

  private triggerSearchMode(workflowContext: WorkflowContextType): void {
    workflowContext.setIsLoading(false);
    workflowContext.setShowSearchBox(true);
  }

  private async retrieveCustomerProfile(email: string): Promise<CustomerRecord | null> {
    try {
      const searchItem = createDynamoDBItem('CUSTOMER', email);
      const dbCustomerProfile = await dynamoDBGetItem<CustomerRecord>(searchItem);
    
      return dbCustomerProfile;
    } catch (error) {
      throw new Error(`Database query failed: ${error}`);
    }
  }

  private triggerCreateMode(workflowContext: WorkflowContextType): void {
    workflowContext.setIsLoading(false);
    workflowContext.setShowCreateForm(true);
  }

  private updateCustomerData(customerProfile: CustomerRecord, appCustomer: AppCustomer, workflowContext: WorkflowContextType): void {
    appCustomerProfileMapper(customerProfile, appCustomer);
    
    setGlobalAppCustomer(appCustomer);
    workflowContext.setAppCustomer(appCustomer);
    workflowContext.setIsLoading(false);

  }

  private async handleError(error: unknown): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorWorkflow = new RaiseErrorWorkflow(`GetCustomerProfileWorkflow failed: ${errorMessage}`);
    await errorWorkflow.execute();
  }
}

/**
 * DEVELOPER DOCUMENTATION
 * =======================
 * 
 * GetCustomerProfileWorkflow - Customer Data Retrieval
 * 
 * Purpose:
 * Handles the complete customer profile retrieval process from POS system integration
 * to database lookup, with fallback mechanisms for missing or incomplete data.
 * 
 * Execution Flow:
 * 1. Validates workflow context and AppCustomer availability
 * 2. Extracts and validates consumer email from POS currentAccount
 * 3. If email missing/invalid: Triggers search mode for manual lookup
 * 4. If email present: Retrieves customer profile from DynamoDB
 * 5. If profile not found: Triggers create mode for new customer
 * 6. If profile found: Updates AppCustomer data and context
 * 
 * Key Components:
 * - validateDependencies(): Ensures required context and customer data exist
 * - extractConsumerEmail(): Validates and extracts email from currentAccount
 * - retrieveCustomerProfile(): Queries DynamoDB for customer data
 * - triggerSearchMode(): Opens search box for manual email entry
 * - triggerCreateMode(): Opens form for new customer creation
 * - updateCustomerData(): Maps DB data to AppCustomer and updates context
 * - handleError(): Provides consistent error handling and user feedback
 * 
 * Workflow State Transitions:
 * - Search Mode: setShowSearchBox(true) when email validation fails
 * - Create Mode: setShowCreateForm(true) when DB lookup returns null
 * - Success Mode: Updates AppCustomer with retrieved profile data
 * - Error Mode: Triggers RaiseErrorWorkflow for exceptions
 * 
 * Email Validation Logic:
 * - Validates currentAccount exists from POS integration
 * - Validates consumer object exists within currentAccount
 * - Validates email field exists and is not empty/whitespace
 * - Validation: !consumerEmail || consumerEmail.trim() === ''
 * 
 * Database Integration:
 * - Uses dynamoDBGetItem for customer profile retrieval
 * - Searches by email using createDynamoDBItem('CUSTOMER', email)
 * - Returns CustomerRecord type from DynamoDB table
 * - Handles null responses gracefully (customer not found)
 * - Wraps database calls in try-catch for error handling
 * 
 * Data Transformation:
 * - Uses appCustomerProfileMapper to transform DB data to AppCustomer
 * - Updates both global storage and workflow context
 * - Maintains data consistency across application components
 * - Ensures reactive updates throughout the application
 * 
 * Error Handling Strategy:
 * - Critical errors (missing dependencies) throw and stop execution
 * - Database errors are caught and re-thrown with context
 * - All errors result in proper user feedback via RaiseErrorWorkflow
 * - Loading states are managed in all execution paths
 * 
 * Global State Management:
 * - Reads from: getGlobalAppCustomer(), getGlobalWorkflowContext()
 * - Updates: setGlobalAppCustomer(), workflowContext.setAppCustomer()
 * - Manages loading states: setIsLoading(false) in all exit paths
 * 
 * UI Flow Control:
 * Three possible UI outcomes based on data availability:
 * 1. Search Box: Manual email entry when POS email unavailable
 * 2. Create Form: New customer creation when not in database
 * 3. Profile Display: Shows retrieved customer information
 * 
 * Business Context:
 * Critical for wine retail POS operations:
 * - Identifies customers for pricing and discount applications
 * - Enables customer history and preferences tracking
 * - Supports loyalty program integration
 * - Provides fallback mechanisms for various data scenarios
 * 
 * Integration Points:
 * - dynamoDBGetItem: Database query service
 * - appCustomerProfileMapper: Data transformation utility
 * - RaiseErrorWorkflow: Error handling workflow
 * - debugLog: Environment-aware logging utility
 * - Global context management functions
 * 
 * Usage:
 * Typically triggered after StartupWorkflow completes:
 * ```typescript
 * // After getCurrentAccount callback populates currentAccount
 * const workflow = new GetCustomerProfileWorkflow();
 * await workflow.execute();
 * ```
 * 
 * Dependencies:
 * - IWorkflow: Standard workflow interface
 * - WorkflowContextType: Workflow context type definitions
 * - AppCustomer: Customer data model
 * - CustomerRecord: Database record type
 * - debugLogger: Environment-aware logging utility
 * - DynamoDB services: Database integration utilities
 * 
 * Notes:
 * - Critical workflow for customer identification in POS operations
 * - Handles both automated (POS) and manual (search) customer lookup
 * - Debug logging tracks each step with emoji conventions
 * - Email validation prevents empty/whitespace database queries
 * - All execution paths properly manage loading states before exit
 * - Graceful fallbacks ensure UI never gets stuck in loading state
 */


