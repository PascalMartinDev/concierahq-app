import type { CurrentAccount } from "../../../models/webex/customer/CurrentAccount";
import { getGlobalAppCustomer } from "../../../workflow/context/workflowContextInstance";
import type { DiscountStrategy } from "../DiscountStrategy";
import { RaiseErrorWorkflow } from "../../../workflow/workflows/RaiseErrorWorkflow";
import ApplyLineDiscountsByAccountingGroup from "../helpers/ApplyLineDiscountsByAccountingGroup";

class ClubPlatinumDiscountStrategy implements DiscountStrategy {
  _currentAccount!: CurrentAccount;
  private discountCode: string = "ClubPlatinum";
  private _accountingGroup: string = "Wine";
  async execute(): Promise<void> {
    try {
      this.getCurrentAccount();

      if (!this._currentAccount.transactionLines?.length) {
        return;
      }

      await this.applyDiscountStrategy();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorWorkflow = new RaiseErrorWorkflow(`Wine Club discount strategy failed: ${errorMessage}`);
      await errorWorkflow.execute();
      throw error;
    }
  }

  getCurrentAccount(): void {
    const appCustomer = getGlobalAppCustomer();
    if (!appCustomer?.currentAccount) {
      throw new Error('No AppCustomer or CurrentAccount found in global storage');
    }
    this._currentAccount = appCustomer.currentAccount;
  }

  async applyDiscountStrategy(): Promise<void> {
    const applyDiscounts = new ApplyLineDiscountsByAccountingGroup(
      this.discountCode,
      this._currentAccount.transactionLines,
      this._accountingGroup
    );
    applyDiscounts.applyDiscounts();
  }
}

export default ClubPlatinumDiscountStrategy;
