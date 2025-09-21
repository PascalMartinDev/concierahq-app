import React from 'react';
//import { useAppCustomer } from '../../workflow/hooks/useAppCustomer';

const CustomerStatus: React.FC = () => {
  // Use the customer hook to get reactive data
  //const appCustomer = useAppCustomer();

  const group = 'Wine Club Platinum'; // appCustomer?.group;
  const isVip = 'No'; //appCustomer?.isVip;
  const dateJoined = '26 January 2024' // appCustomer?.dateJoined;
  const loyaltyPoints = 512;


  return (
    <div>
       <h3 className="text-lg font-semibold text-gray-900">
        Membership Information:
      </h3>
      <h4 className="text-sm/6  text-gray-500">Group: {group}</h4>
      <h4 className="text-sm/6  text-gray-500">VIP: {isVip}</h4>
      <h4 className="text-sm/6  text-gray-500">Loyalty Points: {loyaltyPoints}</h4>
      <h4 className="text-sm/6  text-gray-500">Member Since: {dateJoined}</h4>
      
    </div>
  );
};

export default CustomerStatus;

