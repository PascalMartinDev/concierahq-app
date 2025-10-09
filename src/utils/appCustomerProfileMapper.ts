
import type { AppCustomer } from "../models/webex/business/AppCustomer";
import type { CustomerRecord } from "../services/db/dynamoDBTableConfiguration";



export const appCustomerProfileMapper = (customerProfile: CustomerRecord, appCustomer: AppCustomer): void => {
        // Customer Profile retreived from DB
        // Update AppCustomer Model values:
        // Set Email
        if (customerProfile.email) {
          appCustomer.customer.email = customerProfile.email;
        }
        // Set Group - NOTE! Group relates to membership levels
        if(customerProfile.groups) {
          appCustomer.group = customerProfile.groups;
        }
        // Set First Name
        if (customerProfile.first_name) {
          appCustomer.customer.firstName = customerProfile.first_name;
        }
        // Set Last Name
        if (customerProfile.last_name) {
          appCustomer.customer.lastName = customerProfile.last_name;
        }
        // Set Phone
        if (customerProfile.phone) {
          appCustomer.customer.phone = customerProfile.phone;
        }
        // Set ADDITIONAL FIELDS HERE!
        
}


