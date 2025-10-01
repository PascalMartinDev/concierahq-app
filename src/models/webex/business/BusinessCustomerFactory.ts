import { AppCustomer } from "./AppCustomer";


export class BusinessCustomerFactory {
  static createAppCustomer(): AppCustomer {
    return new AppCustomer();
  }
}

