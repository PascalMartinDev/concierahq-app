import { getGlobalWorkflowContext } from "../context/workflowContextInstance";
import type { IWorkflow } from "../context/workflowInterface";

export class RaiseErrorWorkflow implements IWorkflow {
  // Main execution method:
  private _errorMessage: string = "Unknown Error";

  constructor(erroMessage: string ) {
    this._errorMessage = erroMessage;
  }

  async execute(): Promise<void> {
    const workflowContext = getGlobalWorkflowContext();
		  if (workflowContext) {
			workflowContext.setError(this._errorMessage);
			workflowContext.setShowError(true);
    } else {
      // Force Close WebExtension as fallback:
      pos_close();
    }
  }

}

/**
 * DOCUMENTATION: RaiseErrorWorkflow Class
 * 
 * PURPOSE:
 * A specialized workflow class that handles error scenarios across the wine retail
 * POS integration system. Provides centralized error management with consistent
 * user feedback and fallback mechanisms for critical failures.
 * 
 * FUNCTIONALITY:
 * - Captures and processes error messages from various system components
 * - Updates workflow context to trigger error display UI
 * - Implements fallback web extension closure for critical failures
 * - Provides consistent error handling pattern across all workflows
 * 
 * ARCHITECTURE PATTERN:
 * - Implements IWorkflow interface for consistent workflow execution
 * - Constructor injection pattern for error message customization
 * - Singleton workflow context access for state management
 * - Graceful degradation with pos_close() fallback
 * 
 * ERROR HANDLING STRATEGY:
 * 1. Primary: Update workflow context to show error UI
 *    - setError(): Updates error message for display
 *    - setShowError(true): Triggers error component visibility
 * 2. Fallback: Direct POS web extension closure
 *    - Used when workflow context is unavailable
 *    - Ensures application doesn't hang in error states
 * 
 * BUSINESS CONTEXT:
 * Critical for wine retail POS reliability:
 * - API Gateway communication failures
 * - DynamoDB connection errors
 * - Customer data validation issues
 * - Discount calculation failures
 * - Lightspeed POS integration errors
 * 
 * INTEGRATION POINTS:
 * - getGlobalWorkflowContext(): Access to centralized workflow state
 * - ErrorComponent: UI component for error display
 * - pos_close(): Direct POS function for critical fallback
 * - All other workflows: Universal error handling integration
 * 
 * USAGE PATTERNS:
 * - Catch blocks in workflow classes
 * - API error response handling
 * - Validation failure scenarios
 * - System integration failures
 * 
 * Example usage:
 * ```typescript
 * try {
 *   await someRiskyOperation();
 * } catch (error) {
 *   const errorMessage = error instanceof Error ? error.message : String(error);
 *   const errorWorkflow = new RaiseErrorWorkflow(`Operation failed: ${errorMessage}`);
 *   await errorWorkflow.execute();
 * }
 * ```
 * 
 * CONSTRUCTOR PARAMETERS:
 * - errorMessage: string - Custom error message for user display
 * - Note: Constructor parameter has typo 'erroMessage' (should be 'errorMessage')
 * 
 * The class ensures no errors are silently ignored and provides
 * clear feedback to users while maintaining system stability.
 */