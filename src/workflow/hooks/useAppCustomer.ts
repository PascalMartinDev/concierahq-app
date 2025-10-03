import { useState, useEffect } from 'react';
import type { AppCustomer } from '../../models/webex/business/AppCustomer';
import { getGlobalAppCustomer, subscribeToAppCustomer } from '../context/workflowContextInstance';



export const useAppCustomer = (): AppCustomer | null => {
  const [, setUpdateTrigger] = useState(0);
  
  // Subscribe to AppCustomer changes and force re-render when data updates
  useEffect(() => {
    const unsubscribe = subscribeToAppCustomer(() => {
      setUpdateTrigger(prev => prev + 1); // Force re-render
    });
    
    // Cleanup subscription when component unmounts
    return unsubscribe;
  }, []);
  
  // Return fresh AppCustomer data on each render
  return getGlobalAppCustomer();
};


