import React from "react";
import type { CreditCard as CreditCardType } from "../../models/webex/business/modules/CreditCards";

interface CreditCardProps {
  card: CreditCardType;
}

const CreditCard: React.FC<CreditCardProps> = ({ card }) => {
  // Get card brand icon/color
  const getCardBrandColor = (brand: string) => {
    const brandLower = brand.toLowerCase();
    if (brandLower.includes("visa")) return "bg-blue-50 border-blue-300";
    if (brandLower.includes("mastercard")) return "bg-red-50 border-red-300";
    if (brandLower.includes("amex") || brandLower.includes("american express")) return "bg-green-50 border-green-300";
    if (brandLower.includes("discover")) return "bg-orange-50 border-orange-300";
    return "bg-gray-50 border-gray-300";
  };

  // Check if card is expired
  const isExpired = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (card.expiryYear < currentYear) return true;
    if (card.expiryYear === currentYear && card.expiryMonth < currentMonth) return true;
    return false;
  };

  const expired = isExpired();
  const isDefaultCard = card.isDefault === "true" || card.isDefault === "1";

  return (
    <div
      className={`relative p-4 rounded-lg border-2 ${getCardBrandColor(card.cardBrand)} ${
        expired ? "opacity-60" : ""
      }`}
    >
      {/* Default badge */}
      {isDefaultCard && (
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">
            DEFAULT
          </span>
        </div>
      )}

      {/* Expired badge */}
      {expired && (
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500 text-white">
            EXPIRED
          </span>
        </div>
      )}

      {/* Card brand */}
      <div className="mb-3">
        <span className="text-lg font-bold text-gray-800">{card.cardBrand}</span>
      </div>

      {/* Masked card number */}
      <div className="mb-3">
        <p className="text-xl font-mono tracking-wider text-gray-700">
          {card.maskedCardNumber}
        </p>
      </div>

      {/* Expiry date */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 mb-1">EXPIRES</p>
          <p className="text-sm font-medium text-gray-700">
            {String(card.expiryMonth).padStart(2, "0")}/{card.expiryYear}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
