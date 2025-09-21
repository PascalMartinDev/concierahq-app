import React from 'react';
//import { useAppCustomer } from '../../workflow/hooks/useAppCustomer';


const CustomerSubscriptionDetails: React.FC = () => {
  // Use the customer hook to get reactive AppCustomer data
  //const appCustomer = useAppCustomer();

  const subscriptionTier = 'Platinum'; //appCustomer?.lastVenueVisitDate;
  const subscriptionStatus = 'Active' ; // appCustomer?.lastPurchaseActivity;
  const subscriptionNextScheduledDelivery = "15/1/2026"
  const subscriptionJoinedDate = "2/8/2025"


  return (
    <div>
       <h3 className="text-lg font-semibold text-gray-900">
        Wine Club Details:  
      </h3>
      <h4 className="text-sm/6  text-gray-500">
        Wine Club Level: {subscriptionTier}
      </h4>
      <h4 className="text-sm/6  text-gray-500">
        Status: {subscriptionStatus}
      </h4>
      <h4 className="text-sm/6  text-gray-500">
        Next Scheduled Delivery: {subscriptionNextScheduledDelivery}
      </h4>
      <h4 className="text-sm/6  text-gray-500">
        Wine Club Join Date: {subscriptionJoinedDate}
      </h4>
    </div>
  );
};

export default CustomerSubscriptionDetails;