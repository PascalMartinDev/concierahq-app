import type { CurrentAccount } from "../../../models/webex/customer/CurrentAccount";
import { getGlobalAppCustomer } from "../../../workflow/context/workflowContextInstance";
import type { DiscountStrategy } from "../DiscountStrategy";
import { RaiseErrorWorkflow } from "../../../workflow/workflows/RaiseErrorWorkflow";
import ApplyTotalOrderDiscount from "../helpers/ApplyTotalOrderDiscount";

class LoyaltyDiscountStrategy implements DiscountStrategy {
  _currentAccount!: CurrentAccount;
  private discountCode: string = "Loyalty";

  async execute(): Promise<void> {
    try {
      this.getCurrentAccount();

      if (!this._currentAccount.transactionLines?.length) {
        return;
      }
      // Conditons apply discount strategy if Current Account value meets requirements:
      if (this._currentAccount.totalAmount > 19999){
        await this.applyDiscountStrategy();
      }
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
    const applyDiscounts = new ApplyTotalOrderDiscount(
      this.discountCode,
      this._currentAccount.discounts
    );
    applyDiscounts.applyDiscounts();
  }
}

export default LoyaltyDiscountStrategy;
