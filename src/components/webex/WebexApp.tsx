//import React, { useEffect, useState } from "react";
import HeaderSection from "./HeaderSection";
import FooterMenu from "./FooterMenu";
import WebexMainSection from "./WebexMainSection.tsx";
import WebexPosContext from "./WebexPosContext";
//import LoadingApp from "./LoadingApp.tsx";
//import WebexUnauthorised from "./WebexUnauthorised";
import { lskPosContext } from "../../lsk/lskPosContext";
//import { useWorkflow } from "../../workflow/hooks/useWorkflow";
//import ErrorAlert from "./ErrorAlert.tsx";

const WebexApp: React.FC = () => {
  //const { isLoading, showError} = useWorkflow();
  
  //const [isAuthorised, setIsAuthorised] = useState<boolean>(false);
  /*
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

  // Check if business ID is Authorised
  if (!isAuthorised) {
    return <WebexUnauthorised />;
  } */

  return (
    <>
      <HeaderSection />
      {/* Show is Loading while fetchg data */}
      
      {/*{isLoading && <LoadingApp /> }*/}
      {/* Show main content when customer data is loaded */}
      {/*{!isLoading && !showError && <WebexMainSection /> }*/}
      <WebexMainSection />
      {/* Show Error component and message */}
      {/*{showError && <ErrorAlert />}*/}
      < FooterMenu />
      <WebexPosContext
        userName={String(lskPosContext.userName ?? "Unknown User!")}
        locationId={String(lskPosContext.locationId ?? "Unknown Location!")}
        deviceId={String(lskPosContext.deviceId ?? "Unknown Device!")}
      /> 
    </>

  );
};

export default WebexApp;