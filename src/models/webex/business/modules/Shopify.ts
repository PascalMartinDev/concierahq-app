export class Shopify {
  protected _customerState: string[] = [];
  

  // Getters:
  get customerState(): string[] {
    return this._customerState;
  }

  // Setters:
  set customerState(value: string[]) {
    this._customerState = value;
  }
}
