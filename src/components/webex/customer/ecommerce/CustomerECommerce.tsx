import React from 'react';
import CustomerCreditCards from '../creditcards/CustomerCreditCards';
import CustomerCommerceSeven from './CustomerCommerceSeven';
import CustomerShopify from './CustomerShopify';

const CustomerECommerce: React.FC = () => {
  const ecommerceIntegration = import.meta.env.VITE_INTEGRATION_ECOMMERCE;

  // If no ecommerce integration is configured, return null (render nothing)
  if (!ecommerceIntegration) {
    return null;
  }

  // Determine which ecommerce component to render
  const renderEcommerceComponent = () => {
    switch (ecommerceIntegration) {
      case 'Commerce7':
        return <CustomerCommerceSeven />;
      case 'Shopify':
        return <CustomerShopify />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
      
        {renderEcommerceComponent() && (
          <div className="flex-1 space-y-2">
            {renderEcommerceComponent()}
          </div>
        )}
        <div className="flex-1 space-y-2">
          <CustomerCreditCards />
        </div>
      </div>
    </div>
  );
};

export default CustomerECommerce;
