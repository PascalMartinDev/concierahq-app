import type { AppCustomer } from "../../models/webex/business/AppCustomer";
import { BaseCustomerMapper } from "./BaseCustomerMapper";

export class ECommerceMapper extends BaseCustomerMapper {
  public override map(): AppCustomer {
    const mapped = super.map();
    this.mapECommerce();
    return mapped;
  }

  private mapECommerce(): void {
    const { ecommerce, commerce_seven } = this.customerProfile;
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

    // Additonal ECommerce Domain Fields:
    const ecommerceIntegration = import.meta.env.VITE_INTEGRATION_ECOMMERCE;
    if (ecommerceIntegration == 'Commerce7') {
      if (!commerce_seven) return;

      const commerce7 = this.appCustomer.commerceSeven;
      
      // Set Clubs:
      if (commerce_seven.clubs) {
        commerce7.clubs = commerce_seven.clubs;
      }
      // Set Flags:
      if (commerce_seven.flags) {
        commerce7.flags = commerce_seven.flags;
      }
      // Set Groups:
      if (commerce_seven.groups) {
        commerce7.groups = commerce_seven.groups;
      }
    }

    // Credit Card Mapping
    if (ecommerce.credit_cards && ecommerce.credit_cards.length > 0) {
      const ccList = target.creditCardList;
      ccList.CreditCardList = ecommerce.credit_cards;
    }
  }
}
