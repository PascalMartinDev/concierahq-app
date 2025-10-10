import { Address } from "./Address";

export class Customer {
  protected _customerId: string = '';
  protected _firstName: string = '';
  protected _lastName: string = '';
  protected _email: string = '';
  protected _phone: string = '';
  protected _address: Address;

  constructor() {
    this._address = new Address();
  }

  // Getters:
  get customerId(): string {
    return this._customerId;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }
  get phone(): string {
    return this._phone;
  }
  
  get address(): Address {
    return this._address;
  }

  // Setters:
  set customerId(value: string) {
    this._customerId = value;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set phone(value: string) {
    this._phone = value;
  }

  set address(value: Address) {
    this._address = value;
  }

}

