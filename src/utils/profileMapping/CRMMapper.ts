import type { AppCustomer } from '../../models/webex/business/AppCustomer';
import { BaseCustomerMapper } from './BaseCustomerMapper';

export class CRMMapper extends BaseCustomerMapper {
  public override map(): AppCustomer {
    const mapped = super.map();
    this.mapCRM();
    return mapped;
  }

  private mapCRM(): void {
    const { customerProfile, appCustomer } = this;
    if (customerProfile.crm_customer_id)
      appCustomer.crm.crmCustomerId = customerProfile.crm_customer_id;
    if (customerProfile.email_status)
      appCustomer.crm.emailStatus = customerProfile.email_status;
    if (customerProfile.notes) appCustomer.crm.notes = customerProfile.notes;
  }
}
