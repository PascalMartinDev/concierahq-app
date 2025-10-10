
import type { AppCustomer } from "../models/webex/business/AppCustomer";
import type { CustomerRecord } from "../services/db/dynamoDBTableConfiguration";
import { Subscription } from "../models/webex/business/modules/Subscription";

export const appCustomerProfileMapper = (customerProfile: CustomerRecord, appCustomer: AppCustomer): void => {  
        // Update AppCustomer Model values:
        // Set Email
        if (customerProfile.email) {
          appCustomer.customer.email = customerProfile.email;
        }
        // Set Group
        if(customerProfile.group) {
          appCustomer.group = customerProfile.group;
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
        // Set CRM ID and Email Status:
        if (customerProfile.email_status) {
          appCustomer.crm.emailStatus = customerProfile.email_status;
        }
        if (customerProfile.crm_customer_id) {
          appCustomer.crm.crmCustomerId = customerProfile.crm_customer_id;
        }
        
        // Set Address:
        if (customerProfile.address) {
          // Set Street1:
          if(customerProfile.address.street1) {
            appCustomer.customer.address.address1 = customerProfile.address.street1;
          }
          // Set Street2:
          if(customerProfile.address.street2) {
            appCustomer.customer.address.address2 = customerProfile.address.street2;
          }
          // Set City:
          if(customerProfile.address.city) {
            appCustomer.customer.address.city = customerProfile.address.city;
          }
          // Set State:
          if(customerProfile.address.state) {
            appCustomer.customer.address.state = customerProfile.address.state;
          }
          // Set Postcode:
          if(customerProfile.address.postcode) {
            appCustomer.customer.address.postcode = customerProfile.address.postcode;
          }
          // Set Country:
          if(customerProfile.address.country) {
            appCustomer.customer.address.country = customerProfile.address.country;
          }
        }
        
        // Set Booking:
        if (customerProfile.booking) {
          // Set Booking Date Time
          if(customerProfile.booking.booking_date_time) {
            appCustomer.bookings.bookingDateTime = customerProfile.booking.booking_date_time;
          }
          // Set Booking Duration
          if(customerProfile.booking.booking_duration) {
            appCustomer.bookings.bookingDuration = customerProfile.booking.booking_duration;
          }
          // Set Booking Is Vip
          if(customerProfile.booking.booking_is_vip) {
            appCustomer.bookings.bookingIsVip = customerProfile.booking.booking_is_vip;
          }
          // Set Booking Notes
          if(customerProfile.booking.booking_notes) {
            appCustomer.bookings.bookingNotes = customerProfile.booking.booking_notes;
          }
          // Set Booking No People
          if(customerProfile.booking.booking_no_people) {
            appCustomer.bookings.bookingNoPeople = customerProfile.booking.booking_no_people;
          }
          // Set Booking Service Name
          if(customerProfile.booking.booking_service_name) {
            appCustomer.bookings.bookingServiceName = customerProfile.booking.booking_service_name;
          }
          // Set Booking Status
          if(customerProfile.booking.booking_status) {
            appCustomer.bookings.bookingStatus = customerProfile.booking.booking_status;
          }
          // Set Booking table Name Number
          if(customerProfile.booking.booking_table_name_number) {
            appCustomer.bookings.bookingTableNameNumber = customerProfile.booking.booking_table_name_number;
          }
          // Set Booking Table Section
          if(customerProfile.booking.booking_table_section) {
            appCustomer.bookings.bookingTableSection = customerProfile.booking.booking_table_section;
          }
          // Set Booking Tags List
          if(customerProfile.booking.booking_tags_list) {
            appCustomer.bookings.bookingTagList = customerProfile.booking.booking_tags_list;
          }
        }
        
        // Set E-Commerce:
        if (customerProfile.ecommerce) {
          // Set E-Commerce ID:
          if(customerProfile.ecommerce.e_commerce_customer_id) {
            appCustomer.eCommerce.eCommerceCustomerId = customerProfile.ecommerce.e_commerce_customer_id;
          }
          // Set Subscription:
          if(customerProfile.ecommerce.subscription) {
            if(appCustomer.eCommerce.subscription === null) {
              appCustomer.eCommerce.subscription = new Subscription();
            }
            // Set Next Subscription Date:
            if(customerProfile.ecommerce.subscription.next_subscription_date) {
              appCustomer.eCommerce.subscription.subscriptionNextDate = customerProfile.ecommerce.subscription.next_subscription_date;
            }
            // Set Subscription Cancelled Date:
            if(customerProfile.ecommerce.subscription.subscription_cancelled_date) {
              appCustomer.eCommerce.subscription.subscriptionCancelledDate = customerProfile.ecommerce.subscription.subscription_cancelled_date;
            }
            // Set Subscription Joined Date:
            if(customerProfile.ecommerce.subscription.subscription_joined_date) {
              appCustomer.eCommerce.subscription.subscriptionJoinedDate = customerProfile.ecommerce.subscription.subscription_joined_date;
            }
            // Set Subscription Status:
            if(customerProfile.ecommerce.subscription.subscription_status) {
              appCustomer.eCommerce.subscription.subscriptionStatus = customerProfile.ecommerce.subscription.subscription_status;
            }
            // Set Subscription Level:
            if(customerProfile.ecommerce.subscription.subscription_level) {
              appCustomer.eCommerce.subscription.subscriptionLevel = customerProfile.ecommerce.subscription.subscription_level;
            }
          }
        }

        // Set Commerce Seven:
        if (customerProfile.commerce_seven) {
          // Set Clubs:
          if(customerProfile.commerce_seven.clubs){
             appCustomer.commerceSeven.clubs = customerProfile.commerce_seven.clubs;
          }
          // Set Flags:
          if(customerProfile.commerce_seven.flags){
            appCustomer.commerceSeven.flags = customerProfile.commerce_seven.flags;
          }
          // Set Groups:
          if(customerProfile.commerce_seven.groups){
            appCustomer.commerceSeven.groups = customerProfile.commerce_seven.groups;
          }
        }
}
