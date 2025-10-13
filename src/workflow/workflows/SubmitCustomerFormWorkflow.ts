import type { IWorkflow } from '../context/workflowInterface';
import { RaiseErrorWorkflow } from './RaiseErrorWorkflow';
import { getGlobalAppCustomer } from '../context/workflowContextInstance';
import { CloseExtensionWorkflow } from './CloseExtensionWorkflow';
import ApiGateway from '../../services/api/ApiGateway';

export class SubmitCustomerFormWorkflow implements IWorkflow {
  async execute(): Promise<void> {
    try {
      const appCustomer = await this.validateDependencies();
      await this.executeWorkflowChain(appCustomer);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorWorkflow = new RaiseErrorWorkflow(
        `SubmitCustomerFormWorkflow failed: ${errorMessage}`
      );
      await errorWorkflow.execute();
    }
  }

  private async validateDependencies() {
    const appCustomer = getGlobalAppCustomer();
    if (!appCustomer?.customer) {
      throw new Error('No AppCustomer found in global storage');
    }
    return appCustomer;
  }

  private async executeWorkflowChain(appCustomer: {
    group?: string;
  }): Promise<void> {
    alert(`TEST: appCustomer Group - ${appCustomer.group || 'NO GROUP SET'}`);
    if (appCustomer.group) {
      alert('TEST: Calling sendCustomerInformation');
      await this.sendCustomerInformation();
      alert('TEST: sendCustomerInformation completed');
    } else {
      alert('TEST: No group found, skipping API call');
    }
    const closeExtenstionWorfklow = new CloseExtensionWorkflow();
    await closeExtenstionWorfklow.execute();
  }

  private async sendCustomerInformation(): Promise<void> {
    try {
      alert('TEST: Getting ApiGateway instance');
      const apiGateway = ApiGateway.getInstance();
      alert('TEST: Calling submitWebexForm');
      await apiGateway.submitWebexForm();
      alert('TEST: submitWebexForm completed successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`TEST ERROR: ${errorMessage}`);
      throw new Error(`Failed to send Customer Information: ${errorMessage}`);
    }
  }
}

/**
 * DEVELOPER DOCUMENTATION
 * =======================
 * 
 * SubmitCustomerFormWorkflow
 * 
 * Purpose:
 * This workflow handles the customer form submission process, including validation,
 * API communication, and extension closure via CloseExtensionWorkflow.
 * 
 * Flow Overview:
 * 1. Validates that AppCustomer exists in global storage
 * 2. If customer has a group, sends customer information to external API
 * 3. Executes CloseExtensionWorkflow to handle extension closure
 * 
 * Dependencies:
 * - Global AppCustomer must be available via getGlobalAppCustomer()
 * - apiGatewayPostCustomer for external API communication
 * - CloseExtensionWorkflow for handling extension closure
 * 
 * Error Handling:
 * - All errors are caught and handled via RaiseErrorWorkflow
 * - API communication failures are logged but don't stop the workflow
 * - Extension closure is delegated to CloseExtensionWorkflow
 * 
 * Usage:
 * const workflow = new SubmitCustomerFormWorkflow();
 * await workflow.execute();
 * 
 * Note: This workflow delegates extension closure to CloseExtensionWorkflow
 * rather than handling it directly.
 */
