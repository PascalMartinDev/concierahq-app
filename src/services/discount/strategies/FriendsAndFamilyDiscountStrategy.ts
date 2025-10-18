import type { CurrentAccount } from "../../../models/webex/customer/CurrentAccount";
import { getGlobalAppCustomer } from "../../../workflow/context/workflowContextInstance";
import type { DiscountStrategy } from "../DiscountStrategy";
import { RaiseErrorWorkflow } from "../../../workflow/workflows/RaiseErrorWorkflow";
import ApplyLineDiscountsByAccountingGroup from "../helpers/ApplyLineDiscountsByAccountingGroup";

class FriendsAndFamilyDiscountStrategy implements DiscountStrategy {
  _currentAccount!: CurrentAccount;

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
  // Customer Discount Strategy for Family and Friends
  async applyDiscountStrategy(): Promise<void> {
    // Apply Wine discounts
    const applyDiscountsWine = new ApplyLineDiscountsByAccountingGroup(
      'FriendsandFamilyWine',
      this._currentAccount.transactionLines,
      'Wines'
    );
    applyDiscountsWine.applyDiscounts();
    // Apply Beer discounts
    const applyDiscountsBeer = new ApplyLineDiscountsByAccountingGroup(
      'FriendsandFamilyBeer',
      this._currentAccount.transactionLines,
      'Beers'
    );
    applyDiscountsBeer.applyDiscounts();
    // Apply Food discounts
    const applyDiscountsFood = new ApplyLineDiscountsByAccountingGroup(
      'FriendsandFamilyFood',
      this._currentAccount.transactionLines,
      'Food'
    );
    applyDiscountsFood.applyDiscounts()
    // Apply Beer discounts
    const applyDiscountsDessert = new ApplyLineDiscountsByAccountingGroup(
      'Comp',
      this._currentAccount.transactionLines,
      'Desserts'
    );
    applyDiscountsDessert.applyDiscounts()
  }
}

export default FriendsAndFamilyDiscountStrategy;
