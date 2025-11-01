import React from 'react';
import { useAppCustomer } from '../../../../workflow/hooks/useAppCustomer';

const CustomerCommerceSeven: React.FC = () => {
  const appCustomer = useAppCustomer();

  const c7EmailMarketingStatus = appCustomer?.commerceSeven.emailMarketingStatus;
  
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <div className="space-y-1">
        <p className="text-gray-600">
          <b>Email Marketing Status:</b> {c7EmailMarketingStatus}
        </p>
        <p className="text-gray-600">
          ADD BUTTON TO SEND OPTIN EMAIL
        </p>
      
      </div>
    </div>
  );
};

export default CustomerCommerceSeven;
