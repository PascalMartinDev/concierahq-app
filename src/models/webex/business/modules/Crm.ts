export class Crm {
  protected _crmCustomerId: string = '';
  protected _emailStatus: string = '';
  
  // Getters:
  get crmCustomerId(): string {
    return this._crmCustomerId;
  }
  get emailStatus(): string { 
    return this._emailStatus;
  }

  // Setters:
  set crmCustomerId(value: string) {
    this._crmCustomerId = value;
  }
  set emailStatus(value: string) {
    this._emailStatus = value;
  }
}