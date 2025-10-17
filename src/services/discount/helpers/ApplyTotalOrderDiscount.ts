const handleGlobalDiscountCallback = () => {};

class ApplyTotalOrderDiscount {
  private _discountCode: string;
  private _discounts: string[];

  constructor(discountCode: string, discounts: string[]) {
    this._discountCode = discountCode;
    this._discounts = discounts;
  }

  public applyDiscounts(): void {
    if (!this._discounts.includes(this._discountCode)) {
      pos_toggleGlobalDiscount(
        this._discountCode,
        handleGlobalDiscountCallback
      );
    }
  }
}

export default ApplyTotalOrderDiscount;
