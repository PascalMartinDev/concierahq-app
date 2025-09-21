import React from "react";
import HeaderSection from "./HeaderSection";
import FooterMenu from "./FooterMenu";
import CustomerDetailsSection from "./customer/CustomerDetailsSection";

// Component Template
const Webex: React.FC = () => {
  return (
    <>
      <HeaderSection />
      <CustomerDetailsSection />
      {/*<CustomerManagementSection />*/}
      < FooterMenu />
    </>
    
  );
};

export default Webex;