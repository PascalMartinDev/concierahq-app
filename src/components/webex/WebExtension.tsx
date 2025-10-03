import React, { useEffect, useState } from "react";
import HeaderSection from "./HeaderSection";
import FooterMenu from "./FooterMenu";
import CustomerDetailsSection from "./customer/CustomerDetailsSection";
import WebexUnauthorised from "./WebexUnauthorised";
import { lskPosContext } from "../../lsk/lskPosContext";

// Component Template
const WebExtension: React.FC = () => {
  const [isAuthorised, setIsAuthorised] = useState<boolean>(false);

  useEffect(() => {
    // Initialize posContext when component mounts
    lskPosContext.initialise(posContext);

    // Check if businessId matches authorised ID
    if (posContext.businessId == 65652) {
      setIsAuthorised(true);
    }
  }, []);

  if (!isAuthorised) {
    return <WebexUnauthorised />;
  }

  return (
    <>
      <HeaderSection />
      <CustomerDetailsSection />
      {/*<CustomerManagementSection />*/}
      < FooterMenu />
    </>

  );
};

export default WebExtension;