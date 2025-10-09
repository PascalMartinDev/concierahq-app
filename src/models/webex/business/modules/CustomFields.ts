export class CustomFields {
  protected _customField1: string = '';
  protected _customField2: string = '';
  protected _customField3: string = '';
  protected _customField4: string = '';
  protected _customField5: string = '';

  // ADD MORE CUSTOMER FIELDS FOR INDIVIDUAL BUSINESS NEEDS

  
  // Getters:
  get customField1(): string {
    return this._customField1;
  }

  get customField2(): string {
    return this._customField2;
  }

  get customField3(): string {
    return this._customField3;
  }

  get customField4(): string {
    return this._customField4;
  }

  get customField5(): string {
    return this._customField5;
  }

  // Setters:
  set customerField1(value: string) {
    this._customField1 = value;
  }

  set customerField2(value: string) {
    this._customField2 = value;
  }

  set customerField3(value: string) {
    this._customField3 = value;
  }

  set customerField4(value: string) {
    this._customField4 = value;
  }

  set customerField5(value: string) {
    this._customField5 = value;
  }
}