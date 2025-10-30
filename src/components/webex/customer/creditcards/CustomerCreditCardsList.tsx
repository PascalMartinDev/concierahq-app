import React from 'react';
import CustomerCreditCardsUpdate from './CustomerCreditCardsUpdate';
import CreditCard from '../../../ui/CreditCard';
import { useAppCustomer } from '../../../../workflow/hooks/useAppCustomer';



const CustomerCreditCardsList: React.FC = () => {
  const appCustomer = useAppCustomer();

  // Get credit cards from the eCommerce creditCardList
  const creditCards = appCustomer?.eCommerce.creditCardList.CreditCardList || [];
  
  return (
    <div>
      <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
        <div>
          {creditCards.length === 0 ? (
            <p className="text-gray-400 italic">No credit cards on file</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creditCards.map((card) => (
                <CreditCard key={card.cardId} card={card} />
              ))}
            </div>
          )}
        </div>
        <CustomerCreditCardsUpdate />
    </div>
   </div>
    
  );
};

export default CustomerCreditCardsList;
