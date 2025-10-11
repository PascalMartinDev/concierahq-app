import { Subscription } from './Subscription';

export class ECommerce {
  protected _eCommerceCustomerId: string = '';
  protected _tags: string[] = [];
  protected _subscription: Subscription;

  constructor() {
    this._subscription = new Subscription();
  }

  // Getters:
  get eCommerceCustomerId(): string {
    return this._eCommerceCustomerId;
  }

  get tags(): string[] {
    return this._tags;
  }

  get subscription(): Subscription {
    return this._subscription;
  }

  // Setters:
  set eCommerceCustomerId(value: string) {
    this._eCommerceCustomerId = value;
  }

  set tags(value: string[]) {
    this._tags = value;
  }

  set subscription(value: Subscription) {
    this._subscription = value;
  }
}
