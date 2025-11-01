export class Shopify {
  protected _customerState: string = "UNKNOWN";
  protected _customerMarketingOptInLevel: string = 'UNKNOWN';
  protected _customerMarketingState: string = 'INVALID';



  // Getters:
  get customerState(): string {
    return this._customerState;
  }
  get customerMarketingOptInLevel(): string {
    return this._customerMarketingOptInLevel;
  }
  get customerMarketingState(): string {
    return this._customerMarketingState;
  }

  // Setters:
  set customerState(value: string) {
    this._customerState = value;
  }
  set customerMarketingOptInLevel(value: string) {
    this._customerMarketingOptInLevel = value;
  }
  set customerMarketingState(value: string) {
    this._customerMarketingState = value;
  }
}
