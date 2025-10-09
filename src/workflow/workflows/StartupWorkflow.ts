import type { IWorkflow } from '../context/workflowInterface';
import {
  setGlobalWorkflowContext,
  setGlobalAppCustomer,
} from '../context/workflowContextInstance';
import getCurrentAccountCallback from '../../utils/getCurrentAccountCallback';
import { BusinessCustomerFactory } from '../../models/webex/business/BusinessCustomerFactory';
import type { WorkflowContextType } from '../context/workflowContext';

export class StartupWorkflow implements IWorkflow {
  workflowContext: WorkflowContextType;

  constructor(workflowContext: WorkflowContextType) {
    this.workflowContext = workflowContext;
  }

  // Main execution method
  async execute(): Promise<void> {
    // Create appCustomer instance and store in both global storage and context
    const appCustomerInstance = BusinessCustomerFactory.createAppCustomer();
    setGlobalAppCustomer(appCustomerInstance);
    this.workflowContext.setAppCustomer(appCustomerInstance);

    // Set global context reference
    setGlobalWorkflowContext(this.workflowContext);
    // Call POS Current Account with debuglog:
    pos_getCurrentAccount(getCurrentAccountCallback);
    // Set loading to false after half second to allow everything to load
    setTimeout(() => {
      this.workflowContext.setIsLoading(false);
    }, 500);
    console.log('TEST: Start Up Workflow initialised');
  }
}

/**
 * DEVELOPER DOCUMENTATION
 * =======================
 *
 * StartupWorkflow - Application Initialization
 *
 * Purpose:
 * This workflow handles the critical initialization sequence when the app starts.
 * It establishes the core application context and triggers the account retrieval process.
 *
 * Execution Flow:
 * 1. Creates an AppCustomer instance using BusinessCustomerFactory
 * 2. Sets the AppCustomer in both global storage and workflow context
 * 3. Establishes global workflow context reference
 * 4. Triggers POS getCurrentAccount with callback handler
 * 5. Sets isLoading to false after 500ms to allow everything to load
 *
 * Key Components:
 * - BusinessCustomerFactory: Creates the main application customer instance
 * - setGlobalAppCustomer(): Stores AppCustomer globally for app-wide access
 * - setGlobalWorkflowContext(): Makes workflow context available globally
 * - pos_getCurrentAccount(): Native K-series POS function call
 * - getCurrentAccountCallback: Handles the response from POS system
 *
 * Global State Management:
 * The workflow establishes two critical global references:
 * - Global AppCustomer: Available throughout the app lifecycle
 * - Global WorkflowContext: Provides workflow coordination across components
 *
 * POS Integration:
 * - Calls pos_getCurrentAccount() to retrieve current account from POS system
 * - Uses getCurrentAccountCallback to process the POS response
 * - The callback expects AppCustomer to be ready (created in step 1)
 *
 * Debug Logging:
 * - Uses debugLog() for environment-aware logging
 * - Logs are only shown in development/staging environments
 * - Tracks initialization progress and POS integration steps
 *
 * Usage:
 * This workflow should be executed once at app startup:
 * ```typescript
 * const startupWorkflow = new StartupWorkflow(workflowContext);
 * await startupWorkflow.execute();
 * ```
 *
 * Dependencies:
 * - WorkflowContextType: Main workflow context interface
 * - BusinessCustomerFactory: Customer instance creation
 * - debugLogger: Environment-aware logging utility
 * - getCurrentAccountCallback: POS response handler
 *
 * Notes:
 * - This is a critical initialization workflow - errors here affect entire app
 * - AppCustomer must be created before POS callback to avoid race conditions
 * - Global state is set for components that need access outside workflow context
 * - Loading state is managed with 500ms delay to ensure UI stability after initialization
 */
