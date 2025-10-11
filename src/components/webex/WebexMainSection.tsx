import CustomerManagementSection from "./interactions/CustomerManagementSection";
import CustomerMainSection from "./customer/CustomerMainSection.tsx";

const WebexMainSection: React.FC = () => {
  return (
    <div>
      <CustomerMainSection />
      <CustomerManagementSection />
    </div>
  );
};

export default WebexMainSection;