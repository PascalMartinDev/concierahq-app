import type { IWorkflow } from '../context/workflowInterface';
import { RaiseErrorWorkflow } from './RaiseErrorWorkflow';
import { getGlobalAppCustomer, getGlobalWorkflowContext } from '../context/workflowContextInstance';
import { CloseExtensionWorkflow } from './CloseExtensionWorkflow';
import ApiGatewayClient from '../../services/api/ApiGatewayClient';


export class SubmitCustomerFormWorkflow implements IWorkflow {
  async execute(): Promise<void> {
    try {
      const {workflowContext, appCustomer} = await this.validateDependencies();
      workflowContext.setLoadingMessage("Updating Customer Details!");
      workflowContext.setIsLoading(true);
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
    const workflowContext = getGlobalWorkflowContext();
        if (!workflowContext) {
          throw new Error('Workflow context not found');
        }

    const appCustomer = getGlobalAppCustomer();
    if (!appCustomer?.customer) {
      throw new Error('No AppCustomer found in global storage');
    }
    return {workflowContext, appCustomer };
  }

  private async executeWorkflowChain(appCustomer: {
    group?: string;
  }): Promise<void> {
    if (appCustomer.group) {
      await this.sendCustomerInformation();
    }
    const closeExtenstionWorfklow = new CloseExtensionWorkflow();
    await closeExtenstionWorfklow.execute();
  }

  private async sendCustomerInformation(): Promise<void> {
    try {
      const apiGatewayClient = ApiGatewayClient.getInstance();
      await apiGatewayClient.postWebexForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
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
