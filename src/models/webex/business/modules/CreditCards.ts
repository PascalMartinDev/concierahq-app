export type CreditCard = {
  cardId: string;
  cardBrand: string;
  maskedCardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault?: string;
};

export class CreditCards {
  private _creditCardList: CreditCard[] = [];
  
  // Getter:
  get CreditCardList(): CreditCard[] {
    return this._creditCardList;
  }
  // Setter:
  set CreditCardList(value: CreditCard[]) {
    this._creditCardList = value;
  }
}