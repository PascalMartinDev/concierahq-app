import type { PosCallback, PosResponse, LSKData } from '../lsk/lsktypes';
import { getGlobalAppCustomer } from '../workflow/context/workflowContextInstance';
import { RaiseErrorWorkflow } from '../workflow/workflows/RaiseErrorWorkflow';
import { GetCustomerProfileWorkflow } from '../workflow/workflows/GetCustomerProfileWorkflow';

// Global variable to store response for React component access
let globalPosResponseSetter: ((data: unknown) => void) | null = null;

// Function to set the global response setter from React context
export const setPosResponseSetter = (setter: (data: unknown) => void): void => {
  globalPosResponseSetter = setter;
};

const getCurrentAccountCallback: PosCallback = (response: PosResponse): void => {
  // Store the response data for React component display
  if (globalPosResponseSetter) {
    globalPosResponseSetter(response);
  } else {
    const errorWorkflow = new RaiseErrorWorkflow('globalPosResponseSetter failed to load!');
    errorWorkflow.execute();
    return;
  }

  // Check for errors:
  if (response.error) {
    const errorWorkflow = new RaiseErrorWorkflow(`getCurrentAccount LSK Error: ${response.error}`);
    errorWorkflow.execute();
    return;
  }

  if (!response.data) {
    const errorWorkflow = new RaiseErrorWorkflow('No data received in getCurrentAccount response');
    errorWorkflow.execute();
    return;
  }

  try {
    // Get AppCustomer directly from global storage
    const appCustomer = getGlobalAppCustomer();    
    if (!appCustomer) {
      const errorWorkflow = new RaiseErrorWorkflow('No AppCustomer found in global storage');
      errorWorkflow.execute();
      return;
    }
   //Callback response Data for adding to the appCustomer model:
   const data = response.data as LSKData;
  
    // Populate CurrentAccount model with LSK data
    if (data.externalReferences)
      appCustomer.currentAccount.externalReferences = data.externalReferences;
    if (data.totalAmount)
      appCustomer.currentAccount.totalAmount = data.totalAmount;
    if (data.transactionLines)
      appCustomer.currentAccount.transactionLines = data.transactionLines;
    if (data.consumer) 
      appCustomer.currentAccount.consumer = data.consumer;
    if (data.discounts)
      appCustomer.currentAccount.discounts = data.discounts;
    if (data.identifier)
      appCustomer.currentAccount.identifier = data.identifier;
    if (data.name) 
      appCustomer.currentAccount.name = data.name;
    if (data.paidAmount)
      appCustomer.currentAccount.paidAmount = data.paidAmount;
    if (data.currentInsertionPhase)
      appCustomer.currentAccount.currentInsertionsPhase = data.currentInsertionPhase;


    // Trigger GetCustomerProfileWorkflow to continue the chain
    const getCustomerProfileWorkflow = new GetCustomerProfileWorkflow();
    getCustomerProfileWorkflow.execute().catch(error => {
      const errorWorkflow = new RaiseErrorWorkflow(`GetCustomerProfileWorkflow failed: ${error.message || error}`);
      errorWorkflow.execute();
    });
    return;
  
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorWorkflow = new RaiseErrorWorkflow(`Error populating CurrentAccount model: ${errorMessage}`);
    errorWorkflow.execute();
  }
};

export default getCurrentAccountCallback;

