import type { AppCustomer } from "../../models/webex/business/AppCustomer";
import type { CustomerRecord } from "../../services/db/dynamoDBTableConfiguration";
import { BaseCustomerMapper } from "./BaseCustomerMapper";
import { BookingMapper } from "./BookingMapper";
import { CRMMapper } from "./CRMMapper";
import { ECommerceMapper } from "./ECommerceMapper";

export class CustomerMapperFactory {
  static createMappers(customerProfile: CustomerRecord, appCustomer: AppCustomer): void {
    const mappers: BaseCustomerMapper[] = [];

    // Base mapper always first
    mappers.push(new BaseCustomerMapper(customerProfile, appCustomer));

    // Conditional mappers based on env or runtime settings
    if (import.meta.env.VITE_INTEGRATION_ECOMMERCE !== 'false')
      mappers.push(new ECommerceMapper (customerProfile, appCustomer));

    if (import.meta.env.VITE_INTEGRATION_BOOKINGS !=='false')
      mappers.push(new BookingMapper(customerProfile, appCustomer));

    if (import.meta.env.VITE_INTEGRATION_CRM !== 'false')
      mappers.push(new CRMMapper(customerProfile, appCustomer));

    // Execute all mappers in sequence
    mappers.forEach(mapper => mapper.map());
  }
}
