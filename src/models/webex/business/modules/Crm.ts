export class Crm {
  protected _crmCustomerId: string = '';
  
  // Getters:
  get crmCustomerId(): string {
    return this._crmCustomerId;
  }

  // Setters:
  set crmCustomerId(value: string) {
    this._crmCustomerId = value;
  }
}