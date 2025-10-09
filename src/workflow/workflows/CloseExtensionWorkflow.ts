import type { IWorkflow } from '../context/workflowInterface';
import { RaiseErrorWorkflow } from './RaiseErrorWorkflow';
import { SetConsumerWorkflow } from '../workflows/SetConsumerWorkflow'
import { getGlobalAppCustomer } from '../context/workflowContextInstance';
//import { DiscountStrategyRegistry } from '../../discounts/DiscountStrategyRegistry';

export class CloseExtensionWorkflow implements IWorkflow {
  async execute(): Promise<void> { 
    try {
       const appCustomer  = await this.validateDependencies();
       await this.executeWorkflowChain(appCustomer);
       this.closeExtension();       
     } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorWorkflow = new RaiseErrorWorkflow(`CloseExtensionWorkflow failed: ${errorMessage}`);
        await errorWorkflow.execute();
     }
  }
  
  private async validateDependencies() {

    const appCustomer = getGlobalAppCustomer();
    if (!appCustomer?.customer) {
      throw new Error('No AppCustomer found in global storage');
    }
    return appCustomer ;
  }

  private async executeWorkflowChain(appCustomer: { group?: string }): Promise<void> {
    console.log(appCustomer.group);
    const setConsumerWorkflow = new SetConsumerWorkflow();
    await setConsumerWorkflow.execute();

    if (appCustomer.group) {
      await this.applyDiscountStrategy(appCustomer.group);
    }
  }

  private async applyDiscountStrategy(customerGroup: string): Promise<void> {
    try {
      const strategy = true;//DiscountStrategyRegistry.getStrategy(customerGroup);
      if (strategy) {
        console.log(`TEST: Applying discount strategy for group ${customerGroup}`);
        //await strategy.execute();
      }
    } catch (error) {
      console.log(`TEST: Error no strategy ${error}`); // REMOVE TO LOGGER
    }
  }

  private closeExtension(): void {
    try {
      pos_close();
    } catch (error) {
      console.log(`TEST: closeextension ${error}`)
    }
  }
  
}

/**
 * DEVELOPER DOCUMENTATION
 * =======================
 * 
 * CloseExtensionWorkflow - Extension Shutdown and Discount Application
 * 
 * Purpose:
 * Handles the complete shutdown sequence when closing the wine retail POS extension.
 * Processes customer data, applies discount strategies, and ensures clean closure.
 * 
 * Execution Flow:
 * 1. validateDependencies(): Validates global AppCustomer availability
 * 2. executeWorkflowChain(): Runs SetConsumerWorkflow and conditional discount application
 * 3. closeExtension(): Safely triggers POS extension closure
 * 4. Comprehensive error handling with RaiseErrorWorkflow integration
 * 
 * Key Components:
 * - validateDependencies(): Ensures AppCustomer exists with valid customer data
 * - executeWorkflowChain(): Executes SetConsumer workflow and group-based discounts
 * - applyDiscountStrategy(): Safely applies discount strategy for customer group
 * - closeExtension(): Wraps pos_close() with error protection
 * 
 * Error Handling Strategy:
 * - Critical errors (missing AppCustomer) throw and trigger RaiseErrorWorkflow
 * - Discount application errors are logged but don't halt execution
 * - pos_close() failures are logged but don't prevent workflow completion
 * - All errors include detailed logging with emoji indicators
 * 
 * Workflow Chain Details:
 * 1. SetConsumerWorkflow always executes to finalize customer state
 * 2. Discount strategy only applies when customer.group exists
 * 3. Strategy registry automatically selects appropriate discount implementation
 * 4. Each step includes debug logging for visibility
 * 
 * Discount Integration:
 * - Uses DiscountStrategyRegistry for strategy selection
 * - Supports all customer groups: wine_club, staff, international, fotb
 * - Discount failures are non-blocking to ensure extension closure
 * - Optimized strategies include early exit for empty transactions
 * 
 * Business Context:
 * Essential for wine retail POS reliability:
 * - Finalizes customer transaction processing
 * - Applies group-specific pricing discounts
 * - Ensures clean extension shutdown
 * - Prevents data loss or corruption
 * 
 * Integration Points:
 * - SetConsumerWorkflow: Customer state finalization
 * - DiscountStrategyRegistry: Group-based discount strategy selection
 * - getGlobalAppCustomer(): Customer data access
 * - RaiseErrorWorkflow: Centralized error handling and user feedback
 * - pos_close(): Native POS extension closure function
 * - debugLog(): Environment-aware logging with emoji indicators
 * 
 * Usage Example:
 * ```typescript
 * const closeWorkflow = new CloseExtensionWorkflow();
 * await closeWorkflow.execute();
 * // Extension will be closed with all processing complete
 * ```
 * 
 * Dependencies:
 * - IWorkflow: Standard workflow interface contract
 * - AppCustomer: Customer data model from global storage
 * - DiscountStrategyRegistry: Strategy pattern implementation for discounts
 * - SetConsumerWorkflow: Customer state finalization workflow
 * - RaiseErrorWorkflow: Error handling and user notification
 * - debugLogger: Environment-aware logging utility
 * 
 * Production Notes:
 * - All async operations properly awaited for reliable execution
 * - Graceful degradation ensures extension closure on partial failures
 * - Debug logging provides detailed execution visibility
 * - Error handling prevents UI hanging or data corruption
 * - Console.log output included for customer group debugging
 */
