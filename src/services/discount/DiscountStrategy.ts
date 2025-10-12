import type { CurrentAccount } from "../../models/webex/customer/CurrentAccount";

export interface DiscountStrategy {
  // Private Current account retrieved from WorkflowcontextInstance AppCustomer:
  _currentAccount: CurrentAccount;

  // Method to retrieve current account from Workflow context and assign to _currentAccount
  getCurrentAccount: () => void;

  // Method to apply discount strategy to order:
  applyDiscountStrategy: () => void;

  // Main execution method:
  execute(): Promise<void>;
}
