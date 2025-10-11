import type { AppCustomer } from '../../models/webex/business/AppCustomer';
import type { CustomerRecord } from '../../services/db/dynamoDBTableConfiguration';

export class BaseCustomerMapper {
  protected customerProfile: CustomerRecord;
  protected appCustomer: AppCustomer;

  constructor(customerProfile: CustomerRecord, appCustomer: AppCustomer) {
    this.customerProfile = customerProfile;
    this.appCustomer = appCustomer;
  }

  public map(): AppCustomer {
    this.mapBasicDetails();
    this.mapAddress();
    this.mapCustomFields();
    return this.appCustomer;
  }

  protected mapBasicDetails(): void {
    const { customerProfile, appCustomer } = this;

    if (customerProfile.email)
      appCustomer.customer.email = customerProfile.email;
    if (customerProfile.group) appCustomer.group = customerProfile.group;
    if (customerProfile.first_name)
      appCustomer.customer.firstName = customerProfile.first_name;
    if (customerProfile.last_name)
      appCustomer.customer.lastName = customerProfile.last_name;
    if (customerProfile.phone)
      appCustomer.customer.phone = customerProfile.phone;
  }

  protected mapAddress(): void {
    const { address } = this.customerProfile;
    if (!address) return;

    const target = this.appCustomer.customer.address;
    if (address.street1) target.address1 = address.street1;
    if (address.street2) target.address2 = address.street2;
    if (address.city) target.city = address.city;
    if (address.state) target.state = address.state;
    if (address.postcode) target.postcode = address.postcode;
    if (address.country) target.country = address.country;
  }

  protected mapCustomFields(): void {
    const { custom_fields } = this.customerProfile;
    if (!custom_fields) return;

    // Assign custom fields individually to preserve the CustomFields type
    const target = this.appCustomer.customFields;
    if (custom_fields.custom_field_1)
      target.customField1 = custom_fields.custom_field_1;
    if (custom_fields.custom_field_2)
      target.customField2 = custom_fields.custom_field_2;
    if (custom_fields.custom_field_3)
      target.customField3 = custom_fields.custom_field_3;
    if (custom_fields.custom_field_4)
      target.customField4 = custom_fields.custom_field_4;
    if (custom_fields.custom_field_5)
      target.customField5 = custom_fields.custom_field_5;
  }
}
