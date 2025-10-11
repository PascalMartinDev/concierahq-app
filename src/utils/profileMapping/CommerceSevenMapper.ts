import type { AppCustomer } from "../../models/webex/business/AppCustomer";
import { BaseCustomerMapper } from "./BaseCustomerMapper";

export class Commerce7CustomerMapper extends BaseCustomerMapper {
  public override map(): AppCustomer {
    const mapped = super.map();
    this.mapCommerce7();
    return mapped;
  }

  private mapCommerce7(): void {
    const { ecommerce } = this.customerProfile;
    if (!ecommerce) return;

    const target = this.appCustomer.eCommerce;
    if (ecommerce.e_commerce_customer_id)
      target.eCommerceCustomerId = ecommerce.e_commerce_customer_id;
    // Assign ecommerce Tags
    if (ecommerce.tags) target.tags = ecommerce.tags;

    // Assign Subscription Details
    if (ecommerce.subscription) {
      const sub = target.subscription;
      if (ecommerce.subscription.next_subscription_date)
        sub.subscriptionNextDate = ecommerce.subscription.next_subscription_date;
      if (ecommerce.subscription.subscription_joined_date)
        sub.subscriptionJoinedDate = ecommerce.subscription.subscription_joined_date;
      if (ecommerce.subscription.subscription_cancelled_date)
        sub.subscriptionCancelledDate = ecommerce.subscription.subscription_cancelled_date;
      if (ecommerce.subscription.subscription_status)
        sub.subscriptionStatus = ecommerce.subscription.subscription_status;
      if (ecommerce.subscription.subscription_level)
        sub.subscriptionLevel = ecommerce.subscription.subscription_level;
    }
  }
}
