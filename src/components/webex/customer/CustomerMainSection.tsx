import CustomerDetailsSection from "./CustomerDetailsSection";
import CustomerPurchaseHistory from "./CustomerPurchaseHistory";
import CustomerTabDetailsSection from "./CustomerTabDetailsSection";

const CustomerMainSection: React.FC = () => {
  return (
    <>
      <CustomerDetailsSection />
      <CustomerTabDetailsSection />
      <CustomerPurchaseHistory />  
    </>
  );
};

export default CustomerMainSection;