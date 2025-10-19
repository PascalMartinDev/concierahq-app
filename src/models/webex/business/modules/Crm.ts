export class Crm {
  protected _crmCustomerId: string = '';
  protected _emailStatus: string = '';
  protected _notes: string = '';
  
  // Getters:
  get crmCustomerId(): string {
    return this._crmCustomerId;
  }
  get emailStatus(): string { 
    return this._emailStatus;
  }
  get notes(): string {
    return this._notes;
  }

  // Setters:
  set crmCustomerId(value: string) {
    this._crmCustomerId = value;
  }
  set emailStatus(value: string) {
    this._emailStatus = value;
  }
  set notes(value: string) {
    this._notes = value;
  }
}