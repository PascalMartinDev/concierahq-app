import React from 'react';
import { useAppCustomer } from '../../../../workflow/hooks/useAppCustomer';

const CustomerShopify: React.FC = () => {
  const appCustomer = useAppCustomer();

  const shopifyState = appCustomer?.commerceSeven.emailMarketingStatus;
  const shopifyOptInLevel = appCustomer?.shopify.customerMarketingOptInLevel;
  const shopifyMarketingState = appCustomer?.shopify.customerMarketingState
  
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <div className="space-y-1">
        <p className="text-gray-600">
          <b>State:</b> {shopifyState}
        </p>
        <p className="text-gray-600">
          <b>Marketing Opt In Level:</b> {shopifyOptInLevel}
        </p>
        <p className="text-gray-600">
          <b>Marketing State:</b> {shopifyMarketingState}
        </p>
        <p className="text-gray-600">
          ADD BUTTON TO SEND OPTIN EMAIL
        </p>
      
      </div>
    </div>
  );
};

export default CustomerShopify
