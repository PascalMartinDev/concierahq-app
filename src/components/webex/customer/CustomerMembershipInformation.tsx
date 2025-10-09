import React from 'react';
import { useAppCustomer } from '../../../workflow/hooks/useAppCustomer';

const CustomerMembershipInformation: React.FC = () => {
  const appCustomer = useAppCustomer();

  const group = appCustomer?.group;
  const level = appCustomer?.eCommerce?.subscription?.subscriptionLevel;
  const subscriptionStatus = appCustomer?.eCommerce?.subscription?.subscriptionStatus;
  const subscriptionNextDate = appCustomer?.eCommerce?.subscription?.subscriptionNextDate;
  const subscriptionJoinDate = appCustomer?.eCommerce?.subscription?.subscriptionJoinedDate;
  const subscriptionCancelDate = appCustomer?.eCommerce?.subscription?.subscriptionCancelledDate;

  

  return (
    <div>
       <h3 className="text-lg font-semibold text-gray-900">
        Membership Information:
      </h3>
      <h4 className="text-sm/6  text-gray-500">Group: {group}</h4>
      <h4 className="text-sm/6  text-gray-500">Level: {level}</h4>
      <h4 className="text-sm/6  text-gray-500">Subscription Status: {subscriptionStatus}</h4>
      {subscriptionCancelDate ? (
      // If Cancel Date exists, only show Cancel Date
        <h4 className="text-sm/6 text-gray-500">
          Subscription Cancel Date: {subscriptionCancelDate}
        </h4>
      ) : (
        // Otherwise show Next + Join
        <>
          <h4 className="text-sm/6 text-gray-500">
            Subscription Next Date: {subscriptionNextDate}
          </h4>
          <h4 className="text-sm/6 text-gray-500">
            Subscription Join Date: {subscriptionJoinDate}
          </h4>
        </>
      )}
      
    </div>
  );
};

export default CustomerMembershipInformation;

