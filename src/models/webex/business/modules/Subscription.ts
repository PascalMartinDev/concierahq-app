export class Subscription {
  protected _subscriptionStatus: string = '';
  protected _subscriptionNextDate: string = '';
  protected _subscriptionCancelledDate: string = '';
  protected _subscriptionJoinedDate: string = '';
  protected _subscriptionLevel: string = '';
  
  // Getters:
  get subscriptionStatus(): string {
    return this._subscriptionStatus;
  }

  get subscriptionNextDate(): string {
    return this._subscriptionNextDate;
  }
  get subscriptionCancelledDate(): string { 
    return this._subscriptionCancelledDate;
  }
  
  get subscriptionJoinedDate(): string {
    return this._subscriptionJoinedDate;
  }
  get subscriptionLevel(): string {
    return this._subscriptionLevel;
  }
  
  // Setters:
  set subscriptionStatus(value: string) {
    this._subscriptionStatus = value;
  }
  
  set subscriptionNextDate(value: string) {
    this._subscriptionNextDate = value;
  }
  
  set subscriptionCancelledDate(value: string) {
    this._subscriptionCancelledDate = value;
  }
  
  set subscriptionJoinedDate(value: string) {
    this._subscriptionJoinedDate = value;
  }
  set subscriptionLevel(value: string) {
    this._subscriptionLevel = value;
  }
}
