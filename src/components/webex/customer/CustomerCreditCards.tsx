import React from 'react';
import { useAppCustomer } from '../../../workflow/hooks/useAppCustomer';
import CreditCard from '../../ui/CreditCard';
//import { SamplCreditCards } from '../../../data/sampleCreditCards';

const CustomerCreditCards: React.FC = () => {
  const appCustomer = useAppCustomer();

  // Get credit cards from the eCommerce creditCardList
  const creditCards = appCustomer?.eCommerce.creditCardList.CreditCardList || [];
  /*
  const creditCards = SamplCreditCards.map(card => ({
    cardId: card.card_id,
    cardBrand: card.card_brand,
    maskedCardNumber: card.masked_Card_Number,
    expiryMonth: Number(card.expiry_month),
    expiryYear: Number(card.expiry_year),
    isDefault: ((typeof card.is_default === 'string' && card.is_default === 'true') || (typeof card.is_default === 'boolean' && card.is_default === true)) ? 'true' : 'false',
  }));
  */
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <div>
        <p className="text-gray-600 mb-4">
          <b>Payment Methods:</b>
          <p>"TEST: CreditCard List:"</p>
          <p>creditCards</p>
        </p>

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
    </div>
  );
};

export default CustomerCreditCards;
