import type { TransactionLine } from "../../../lsk/lsktypes";

const handleDiscountCallback = () => {};

class ApplyLineDiscountsByAccountingGroup {
  private _items: TransactionLine[];
  private _discountCode: string;
  private _accountingGroup: string;
 
  constructor(discountCode: string, items: TransactionLine[], accountingGroup: string) {
    this._discountCode = discountCode;
    this._items = items;
    this._accountingGroup = accountingGroup;
  }

  applyDiscounts() {
    this._items.forEach((item)=> {
      const { identifier, accountingGroupName, discounts} = item;
      if (accountingGroupName === this._accountingGroup) {
        if(!discounts.includes(this._discountCode)){
          pos_toggleDiscount(this._discountCode, identifier, handleDiscountCallback);
        }
      }
    });
  }  
}

export default ApplyLineDiscountsByAccountingGroup;