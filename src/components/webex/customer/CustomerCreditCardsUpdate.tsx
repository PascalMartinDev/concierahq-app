import React, { useState } from 'react';
import CircleButton from '../../ui/CircleButton';
import ApiGatewayClient from '../../../services/api/ApiGatewayClient';

const CustomerCreditCardsUpdate: React.FC = () => {
  const [showSendButton, setShowSendButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCircleButtonClick = () => {
    setShowSendButton(!showSendButton);
  };

  const handleSendUpdateLink = async () => {
    try {
      setIsLoading(true);
      const apiClient = ApiGatewayClient.getInstance();
      await apiClient.postCreditCardUpdate();
      // Optionally show success message or close the button
      setShowSendButton(false);
    } catch (error) {
      console.error('Error sending credit card update link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 min-h-20">
      {/* CircleButton in top-right corner */}
      <div className="absolute top-5 right-10">
        <CircleButton onButtonClick={handleCircleButtonClick} />
      </div>

   
      <div className="flex items-center justify-center">
        <div className="text-gray-600 font-semibold">Credit Card Update</div>
      </div>

      {/* Send Update Link button */}
      {showSendButton && (
        <div className="mt-4">
          <button
            type="button"
            onClick={handleSendUpdateLink}
            disabled={isLoading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send Update Link'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerCreditCardsUpdate;
