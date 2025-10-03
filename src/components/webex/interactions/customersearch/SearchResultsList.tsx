import React from 'react';
import SearchCard from './SearchCard';
// Update the import path below to the correct location of CustomerSearchResult
// Example: import type { CustomerSearchResult } from '../../../models/CustomerSearchResult';
import type { CustomerSearchResult } from '../../../models/CustomerSearchResult';
import { useAppCustomer } from '../../../workflow/hooks/useAppCustomer';
//import { LoadSearchedCustomerProfileWorkflow } from '../../../workflow/workflows/LoadSearchedCustomerProfileWorkflow';
//import { RaiseErrorWorkflow } from '../../../workflow/workflows/RaiseErrorWorkflow';

interface SearchResultsListProps {
  customerSearch: {
    searchResults: CustomerSearchResult[];
    isLoading: boolean;
    hasResults: boolean;
  };
}

const SearchResultsList = ({ customerSearch }: SearchResultsListProps) => {
  const { searchResults, isLoading, hasResults } = customerSearch;

  // Use the custom hook to get active AppCustomer data
  //const appCustomer = useAppCustomer();

  // Handle card click event -> add to appCustomer
  const handleContactClick = (contact: CustomerSearchResult) => {
    console.log('Contact clicked:', contact);
    if (appCustomer && appCustomer.customer) {
      //Email Assigned to appCustomer for full customer profile retrieval in the next Chain workflow:
      appCustomer.customer.email = contact.email;
      //Trigger LoadSearchedCustomerProfileWorkflow:
      //const loadSearchedCustomerProfileWorkflow = new LoadSearchedCustomerProfileWorkflow();
      //loadSearchedCustomerProfileWorkflow.execute().catch((error) => {
        //const errorMessage = error instanceof Error ? error.message : String(error);
        //console.log(`TEST: Error Message: {errorMessage}`);
        //const errorWorkflow = new RaiseErrorWorkflow(`LoadSearchedCustomerProfileWorkflow failed: ${errorMessage}`);
        //errorWorkflow.execute();
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  // Show no results message
  if (!hasResults) {
    return null; // Don't show anything when no results
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {searchResults.map((contact, index) => (
          <SearchCard
            key={`${contact.email}-${index}`}
            firstName={contact.first_name}
            lastName={contact.last_name}
            email={contact.email}
            phone={contact.phone}
            onClick={() => handleContactClick(contact)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(SearchResultsList);

/**
 * DOCUMENTATION: SearchResultsList Component
 * 
 * PURPOSE:
 * A React container component that manages and displays customer search results
 * in a structured list format for wine retail POS integration. Handles result
 * selection workflow and customer profile loading.
 * 
 * FUNCTIONALITY:
 * - Renders search results using SearchCard components
 * - Manages customer selection and profile loading workflow
 * - Provides loading states and empty result handling
 * - Integrates with workflow system for customer data management
 * 
 * COMPONENT ARCHITECTURE:
 * - React.memo for performance optimization
 * - Props-based search state management
 * - Workflow integration for customer selection
 * - Error handling with RaiseErrorWorkflow
 * 
 * BUSINESS WORKFLOW:
 * Critical component in customer lookup process:
 * 1. Display search results from DynamoDB query
 * 2. Handle customer card selection clicks
 * 3. Update AppCustomer with selected customer email
 * 4. Trigger LoadSearchedCustomerProfileWorkflow
 * 5. Load complete customer profile for POS integration
 * 
 * STATE MANAGEMENT:
 * - searchResults: Array of customer search matches
 * - isLoading: Boolean for loading state display
 * - hasResults: Boolean controlling results visibility
 * 
 * INTEGRATION POINTS:
 * - useAppCustomer hook: Customer data context access
 * - LoadSearchedCustomerProfileWorkflow: Customer profile loading
 * - RaiseErrorWorkflow: Error handling and user feedback
 * - SearchCard: Individual result display components
 * 
 * ERROR HANDLING:
 * Comprehensive error management:
 * - Workflow execution error catching
 * - User-friendly error message formatting
 * - RaiseErrorWorkflow integration for consistent error display
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - React.memo prevents unnecessary re-renders
 * - Efficient key generation for list items
 * - Conditional rendering reduces DOM operations
 */
