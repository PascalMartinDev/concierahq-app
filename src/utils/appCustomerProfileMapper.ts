import type { AppCustomer } from '../models/webex/business/AppCustomer';
import type { CustomerRecord } from '../services/db/dynamoDBTableConfiguration';
import { CustomerMapperFactory } from './profileMapping/CustomerMapperFactory';


export const appCustomerProfileMapper = (
  customerProfile: CustomerRecord,
  appCustomer: AppCustomer
): void => {
  CustomerMapperFactory.createMappers(customerProfile, appCustomer);
}


