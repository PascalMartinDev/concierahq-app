import type { PosCallback, PosResponse } from '../lsk/lsktypes';
import { getGlobalWorkflowContext } from '../workflow/context/workflowContextInstance';

const toggleDiscountsCallback: PosCallback = (response: PosResponse): void => {
  // Replace 'success' with an actual property of PosResponse, e.g., 'status' or 'errorMessage'
  // For example, if 'errorMessage' indicates failure:
  if (response.error) {
    const workflowContext = getGlobalWorkflowContext();
    // Discount failed to apply response"
    // ### ADD LOGGER HERE. ####
    if (workflowContext) {
      workflowContext.setError('Discount failed to apply!');
      workflowContext.setShowError(true);
    }
  }
};

export default toggleDiscountsCallback;
