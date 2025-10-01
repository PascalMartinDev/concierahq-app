export class Address {
  private _address1: string = '';
  private _address2: string = '';
  private _city: string = '';
  private _state: string = '';
  private _stateCode: string = '';
  private _postcode: string = '';

    // Getters:
    get address1(): string {
      return this._address1;
    }

    get address2(): string {
      return this._address2;
    }

    get city(): string {
      return this._city;
    }

    get state(): string {
      return this._state;
    }

    get stateCode(): string {
      return this._stateCode;
    }

    get postcode (): string {
      return this._postcode;
    }

    // Setters:
    set address1(value: string) {
      this._address1 = value;
    }

    set address2(value: string) {
      this._address2 = value;
    }

    set city(value: string) {
      this._city = value;
    }

    set state(value: string) {
      this._state = value;
    }

    set stateCode(value: string) {
      this._stateCode = value;
    }

    set postcode(value: string) {
      this._postcode = value;
    }

}
