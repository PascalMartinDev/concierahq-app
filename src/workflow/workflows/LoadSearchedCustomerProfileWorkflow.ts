import type { IWorkflow } from "../context/workflowInterface";
import dynamoDBGetItem from '../../services/db/dynamoDBGetItem';
import {
  getGlobalAppCustomer,
  getGlobalWorkflowContext,
  setGlobalAppCustomer,
} from '../context/workflowContextInstance';
import { appCustomerProfileMapper } from '../../utils/appCustomerProfileMapper';
import { AppCustomer } from "../../models/webex/business/AppCustomer";
import type { WorkflowContextType } from "../context/workflowContext"
import { createDynamoDBItem, type CustomerRecord } from "../../services/db/dynamoDBTableConfiguration";
import { RaiseErrorWorkflow } from "./RaiseErrorWorkflow";


export class LoadSearchedCustomerProfileWorkflow implements IWorkflow {
  async execute(): Promise<void> {
    
    
    try {
      const { workflowContext, appCustomer } = await this.validateDependencies();
      
      const customerEmail = this.extractCustomerEmail(appCustomer);
      
      const customerProfile = await this.retrieveCustomerProfile(customerEmail);
      if (!customerProfile) {
        this.triggerCreateMode(workflowContext);
        return;
      }

      this.updateCustomerData(customerProfile, appCustomer, workflowContext);
    
      
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
    if (!appCustomer || !appCustomer?.customer || !appCustomer?.customer?.email) {
      throw new Error('No AppCustomer or customer email found in global storage');
    }

    return { workflowContext, appCustomer };
  }

  private extractCustomerEmail(appCustomer: AppCustomer): string {
    const customerEmail = appCustomer.customer.email;
  
    return customerEmail;
  }

  private async retrieveCustomerProfile(email: string): Promise<CustomerRecord | null> {
    try {
      const searchItem = createDynamoDBItem('CUSTOMER', email); //createDynamoDBItem('CUSTOMER', email);
      const dbCustomerProfile = await dynamoDBGetItem<CustomerRecord>(searchItem);
      return dbCustomerProfile;
    } catch (error) {
      throw new Error(`Database query failed: ${error}`);
    }
  }

  private triggerCreateMode(workflowContext: WorkflowContextType): void {
    workflowContext.setIsLoading(false);
    workflowContext.setShowSearchBox(false);
    workflowContext.setShowCreateForm(true);
  }

  private updateCustomerData(customerProfile: CustomerRecord, appCustomer: AppCustomer, workflowContext: WorkflowContextType): void {
    appCustomerProfileMapper(customerProfile, appCustomer);
    
    setGlobalAppCustomer(appCustomer);
    workflowContext.setAppCustomer(appCustomer);
    workflowContext.setShowCreateForm(false);
    workflowContext.setShowSearchBox(false);
    workflowContext.setIsLoading(false);
  }

  private async handleError(error: unknown): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorWorkflow = new RaiseErrorWorkflow(`LoadSearchedCustomerProfileWorkflow failed: ${errorMessage}`);
    await errorWorkflow.execute();
  }
} 

/**
 * DEVELOPER DOCUMENTATION
 * =======================
 * 
 * LoadSearchedCustomerProfileWorkflow - Manual Customer Profile Loading
 * 
 * Purpose:
 * Handles customer profile retrieval after manual email search. This workflow is triggered
 * when users manually enter a customer email in the search box, distinct from the automatic
 * POS-driven customer lookup in GetCustomerProfileWorkflow.
 * 
 * Execution Flow:
 * 1. Validates workflow context and AppCustomer availability
 * 2. Extracts manually entered email from AppCustomer.customer.email
 * 3. Retrieves customer profile from DynamoDB using the email
 * 4. If profile not found: Triggers create mode for new customer
 * 5. If profile found: Updates AppCustomer data and closes search interface
 * 
 * Key Components:
 * - validateDependencies(): Ensures required context and customer email exist
 * - extractCustomerEmail(): Extracts manually entered email for database lookup
 * - retrieveCustomerProfile(): Queries DynamoDB for customer data
 * - triggerCreateMode(): Opens create form when customer not found
 * - updateCustomerData(): Maps DB data to AppCustomer and manages UI states
 * - handleError(): Provides consistent error handling and user feedback
 * 
 * Key Differences from GetCustomerProfileWorkflow:
 * - Uses appCustomer.customer.email (manually entered) vs currentAccount.consumer.email (POS)
 * - Assumes email is already validated and populated by search component
 * - Always closes search box on completion (success or failure)
 * - No fallback to search box (since we're already coming from search)
 * - Simpler validation since email is guaranteed to exist
 * 
 * Workflow State Transitions:
 * Success Path:
 * - setShowSearchBox(false): Closes search interface
 * - setShowCreateForm(false): Ensures create form is closed
 * - setIsLoading(false): Stops loading state
 * - Updates AppCustomer with profile data
 * 
 * Customer Not Found Path:
 * - setShowSearchBox(false): Closes search interface
 * - setShowCreateForm(true): Opens customer creation form
 * - setIsLoading(false): Stops loading state
 * 
 * Database Integration:
 * - Uses dynamoDBGetItem for customer profile retrieval
 * - Searches by manually entered email via createDynamoDBItem('CUSTOMER', email)
 * - Returns CustomerRecord type from DynamoDB table
 * - Handles null responses by opening create form
 * - Wraps database calls in try-catch for error handling
 * 
 * Data Flow:
 * 1. User enters email in search box
 * 2. Search component updates appCustomer.customer.email
 * 3. This workflow extracts that email for database lookup
 * 4. Results are mapped back to AppCustomer for display
 * 5. UI states are updated to reflect operation completion
 * 
 * UI State Management:
 * - Always closes search box (operation complete)
 * - Shows create form if customer not in database
 * - Shows customer profile if found in database
 * - Manages loading states throughout process
 * - Ensures clean UI transitions between states
 * 
 * Error Handling Strategy:
 * - Critical errors (missing dependencies) throw and stop execution
 * - Database errors are caught and re-thrown with context
 * - All errors result in proper user feedback via RaiseErrorWorkflow
 * - Debug logging tracks each step for troubleshooting
 * 
 * Global State Management:
 * - Reads from: getGlobalAppCustomer(), getGlobalWorkflowContext()
 * - Updates: setGlobalAppCustomer(), workflowContext.setAppCustomer()
 * - Manages UI states: setShowSearchBox, setShowCreateForm, setIsLoading
 * 
 * Business Context:
 * Critical for wine retail customer service operations:
 * - Enables manual customer lookup when POS integration fails
 * - Supports customer service scenarios where email is known
 * - Provides fallback to customer creation for new customers
 * - Maintains consistent data flow with automatic lookup workflow
 * - Ensures seamless transition between search and profile/create modes
 * 
 * Integration Points:
 * - dynamoDBGetItem: Database query service
 * - appCustomerProfileMapper: Data transformation utility
 * - RaiseErrorWorkflow: Error handling workflow
 * - debugLog: Environment-aware logging utility
 * - Global context management functions
 * 
 * Usage:
 * Triggered after user manual email search:
 * ```typescript
 * // After user enters email and clicks search
 * const workflow = new LoadSearchedCustomerProfileWorkflow();
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
 * - Complementary to GetCustomerProfileWorkflow (POS-driven)
 * - Assumes email validation is handled by search input component
 * - Always closes search interface regardless of outcome
 * - Debug logging tracks each step with emoji conventions
 * - Designed for manual customer service interactions
 * - Maintains consistent error handling and state management patterns
 * - Proper async/await usage throughout for reliable execution
 */

