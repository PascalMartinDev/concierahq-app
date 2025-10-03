import { createContext } from 'react';
import type { WorkflowContextType } from './workflowContext';
import type { AppCustomer } from '../../models/webex/business/AppCustomer';

// Export the context instance here
export const WorkflowContextInstance = createContext<WorkflowContextType | undefined>(undefined);

// Global reference to current context - set by StartupWorkflow
let currentWorkflowContext: WorkflowContextType | null = null;

export const setGlobalWorkflowContext = (context: WorkflowContextType): void => {
  currentWorkflowContext = context;
};

export const getGlobalWorkflowContext = (): WorkflowContextType | null => {
  return currentWorkflowContext;
};

// Direct AppCustomer storage for immediate access
let currentAppCustomer: AppCustomer | null = null;
let appCustomerListeners: Array<() => void> = [];

export const setGlobalAppCustomer = (appCustomer: AppCustomer): void => {
  currentAppCustomer = appCustomer;
  // Notify all listeners
  appCustomerListeners.forEach(listener => listener());
};

export const getGlobalAppCustomer = (): AppCustomer | null => {
  return currentAppCustomer;
};

export const subscribeToAppCustomer = (listener: () => void): (() => void) => {
  appCustomerListeners.push(listener);
  // Return unsubscribe function
  return () => {
    appCustomerListeners = appCustomerListeners.filter(l => l !== listener);
  };
};
