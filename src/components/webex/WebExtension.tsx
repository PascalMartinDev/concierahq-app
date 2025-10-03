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

  return (
    <>
      <HeaderSection />
      <CustomerDetailsSection />
      <div>
        <p>Business ID: {lskPosContext.businessId}</p>
        <p>Business Name: {lskPosContext.businessName}</p>
        <p>location ID: {lskPosContext.locationId}</p>
        <p>Device Name: {lskPosContext.deviceName}</p>
        <p>Device ID: {lskPosContext.deviceId}</p>
        <p>User Name: {lskPosContext.userName}</p>
        <p>User ID: {lskPosContext.userId}</p>
        
      </div>


      {/*<CustomerManagementSection />*/}
      < FooterMenu />
    </>

  );
};

export default WebExtension;