import type { AppCustomer } from "../models/business/AppCustomer";
import type { CustomerRecord } from "../services/db/dynamoDBTableConfigurations";


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
        // Set Street
        if (customerProfile.street) {
          appCustomer.address.address1 = customerProfile.street;
        }
        // Set City
        if (customerProfile.city) {
          appCustomer.address.city = customerProfile.city;
        }
        // Set State
        if (customerProfile.customer_state) {
          appCustomer.address.state = customerProfile.customer_state;
        }
        // Set Postcode
        if (customerProfile.postcode) {
          appCustomer.address.postcode = customerProfile.postcode;
        }
        // Set First Joined Date
        if (customerProfile.wine_club_first_joined_date) {
          appCustomer.dateJoined = customerProfile.wine_club_first_joined_date;
        }
        // Set Last Order Items
        if (customerProfile.last_order_items) {
          appCustomer.lastPurchaseActivity = customerProfile.last_order_items;
        }
        if (customerProfile.is_vip) {
          appCustomer.isVip = customerProfile.is_vip;
        }
        if (customerProfile.pos_last_visit_date) {
          appCustomer.lastVenueVisitDate = customerProfile.pos_last_visit_date;
        }
}


