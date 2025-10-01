import { Address } from "../customer/Address";
import { CurrentAccount } from "../customer/CurrentAccount";
import { Customer } from "../customer/Customer"


abstract class BusinessCustomer{
  protected _customer: Customer = new Customer();
  protected _address: Address = new Address();
  protected _currentAccount: CurrentAccount = new CurrentAccount();

  // Getters:
  get customer(): Customer {return this._customer;}
  get address(): Address {return this._address;}
  get currentAccount(): CurrentAccount {return this._currentAccount;}

  // Setters:
  set customer(value: Customer) {this._customer = value;}
  set address(value: Address) {this._address = value;}
  set currentAccount(value: CurrentAccount) {this._currentAccount = value;}

}

export default BusinessCustomer;

