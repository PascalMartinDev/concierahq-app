import type { TransactionLine } from "../../../lsk/lsktypes";

const handleDiscountCallback = () => {};

class ApplyLineDiscountsByAccountingGroup {
  private _items: TransactionLine[];
  private _discountCode: string;

  constructor(discountCode: string, items: TransactionLine[]) {
    this._discountCode = discountCode;
    this._items = items;
  }

  applyDiscounts() {
    this._items.forEach((item)=> {
      const { identifier, accountingGroupName, discounts} = item;
      if (accountingGroupName === import.meta.env.VITE_DISCOUNT_STRATEGY_LINE_ITEM_ACCOUNTING_GROUP) {
        if(!discounts.includes(this._discountCode)){
          pos_toggleDiscount(this._discountCode, identifier, handleDiscountCallback);
        }
      }
    });

  }  
}

export default ApplyLineDiscountsByAccountingGroup;