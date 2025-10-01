import type { Subscription } from "./Subscription";

export class ECommerce {
  protected _eCommerceCustomerId: string = '';
  protected _tags: string[] = [];
  protected _subscription: Subscription | null = null;
  
  // Getters:
  get eCommerceCustomerId(): string {
    return this._eCommerceCustomerId;
  }

  get tags(): string[] {
    return this._tags;
  }

  get subscription(): Subscription | null {
    return this._subscription;
  }


  // Setters:
  set eCommerceCustomerId(value: string) {
    this._eCommerceCustomerId = value;
  }

  set tags(value: string[]) {
    this._tags = value;
  }

  set subscription(value: Subscription | null) {
    this._subscription = value;
  }
}