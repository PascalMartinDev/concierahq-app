import React from 'react';
import { useAppCustomer } from '../../../workflow/hooks/useAppCustomer';

const CustomerCustomFields: React.FC = () => {
  const appCustomer = useAppCustomer();

  const cf1 = appCustomer?.customFields.customField1;
  const cf2 = appCustomer?.customFields.customField2;
  const cf3 = appCustomer?.customFields.customField3;
  const cf4 = appCustomer?.customFields.customField4;
  const cf5 = appCustomer?.customFields.customField5;
  

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <div className="space-y-1">
        <p className="text-gray-600">
          <b>Custom Field 1:</b> {cf1}
        </p>
        <p className="text-gray-600">
          <b>Custom Field 2:</b> {cf2}
        </p>
        <p className="text-gray-600">
          <b>Custom Field 3:</b> {cf3}
        </p>
        <p className="text-gray-600">
          <b>Custom Field 4:</b> {cf4}
        </p>
        <p className="text-gray-600">
          <b>Custom Field 5:</b> {cf5}
        </p>
      </div>
    </div>
  );
};

export default CustomerCustomFields;
