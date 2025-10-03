//import React, { useEffect, useState } from "react";
import HeaderSection from "./HeaderSection";
import FooterMenu from "./FooterMenu";
import CustomerDetailsSection from "./customer/CustomerDetailsSection";
//import WebexUnauthorised from "./WebexUnauthorised";
//import { lskPosContext } from "../../lsk/lskPosContext";
//import WebexPosContext from "./WebexPosContext";

// Component Template
const WebExtension: React.FC = () => {
  /* ##### Commented out for Development --> uncommment all items for production 
  const [isAuthorised, setIsAuthorised] = useState<boolean>(false);
 
  useEffect(() => {
    // Check if posContext is available
    if (typeof posContext !== 'undefined') {
      // Initialize posContext when component mounts
      lskPosContext.initialise(posContext);

      // Check if businessId matches authorised ID
      if (posContext.businessId === import.meta.env.VITE_LSK_BUSINESS_ID) {
        setIsAuthorised(true);
      }
    }
  }, []);

  if (!isAuthorised) {
    return <WebexUnauthorised />;
  }
  */
  return (
    <>
      <HeaderSection />
      <CustomerDetailsSection />
      {/*<CustomerManagementSection />*/}
      < FooterMenu />
      {/*<WebexPosContext
        userName={String(lskPosContext.userName ?? "Unknown User!")}
        locationId={String(lskPosContext.locationId ?? "Unknown Location!")}
        deviceId={String(lskPosContext.deviceId ?? "Unknown Device!")}
      />*/}
    </>

  );
};

export default WebExtension;