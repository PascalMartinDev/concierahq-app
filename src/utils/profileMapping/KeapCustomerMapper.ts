import type { AppCustomer } from "../../models/webex/business/AppCustomer";
import { BaseCustomerMapper } from "./BaseCustomerMapper";


export class KeapCustomerMapper extends BaseCustomerMapper {
  public override map(): AppCustomer {
    const mapped = super.map();
    this.mapKeap();
    return mapped;
  }

  private mapKeap(): void {
    const { customerProfile, appCustomer } = this;
    if (customerProfile.crm_customer_id)
      appCustomer.crm.crmCustomerId = customerProfile.crm_customer_id;
    if (customerProfile.email_status)
      appCustomer.crm.emailStatus = customerProfile.email_status;
  }
}
