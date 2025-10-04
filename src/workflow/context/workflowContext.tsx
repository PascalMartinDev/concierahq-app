import { useState } from 'react';
import { WorkflowContextInstance } from './workflowContextInstance';
import type { AppCustomer } from '../../models/webex/business/AppCustomer';


// Context interface - flexible membership
export interface WorkflowContextType {
  // State
  appCustomer: AppCustomer | null;
  searchResults: unknown[];
  isLoading: boolean;
  error: string;
  showError: boolean;
  showCreateForm: boolean;
  showSearchBox: boolean;
  loadingMessage: string;

  // Simple setters
  setAppCustomer: (appCustomer: AppCustomer | null) => void;
  setSearchResults: (results: unknown[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setShowError: (show: boolean) => void;
  setShowCreateForm: (show: boolean) => void;
  setShowSearchBox: (show: boolean) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  clearAll: () => void;
}

// Simple provider
export const WorkflowProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appCustomer, setAppCustomer] = useState<AppCustomer | null>(null);
  const [searchResults, setSearchResults] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("Unknown error!");
  const [showError, setShowError] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading Customer Profile');

  const clearAll = () => {
    setAppCustomer(null);
    setSearchResults([]);
    setIsLoading(false);
    setError("Unknown error!");
    setShowCreateForm(false);
    setShowSearchBox(false);
    setShowError(false);
    setLoadingMessage('Loading Customer Profile');
  };

  return (
    <WorkflowContextInstance.Provider
      value={{
        appCustomer,
        searchResults,
        isLoading,
        error,
        loadingMessage,
        showError,
        showCreateForm,
        showSearchBox,
        setAppCustomer,
        setSearchResults,
        setIsLoading,
        setError,
        setShowCreateForm,
        setShowSearchBox,
        setLoadingMessage,
        setShowError,
        clearAll,
      }}
    >
      {children}
    </WorkflowContextInstance.Provider>
  );
};

