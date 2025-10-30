import React from 'react';
import CustomerCreditCardsList from './CustomerCreditCardsList';
import CustomerCreditCardsUpdate from './CustomerCreditCardsUpdate';


const CustomerCreditCards: React.FC = () => {
  
  return (
    <div>
      <CustomerCreditCardsList />
      <CustomerCreditCardsUpdate />
    </div>
    
  );
};

export default CustomerCreditCards;
