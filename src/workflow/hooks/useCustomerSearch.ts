import { useState, useEffect, useCallback } from 'react';
import dynamoDBSearchCustomer from '../../services/db/dynamoDBSearchCustomer';
import type {
  CustomerSearchQuery,
  CustomerSearchResult,
  CustomerSearchType,
} from '../../services/db/dynamoDBSearchCustomer';
//import { RaiseErrorWorkflow } from '../workflows/RaiseErrorWorkflow';

export const useCustomerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CustomerSearchResult[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchValue, setLastSearchValue] = useState('');

  // Identifying search type based on input type:
  const analyseSearchType = useCallback((query: string): CustomerSearchType => {
    const trimmedQuery: string = query.trim();
    // Check if query is email
    if (trimmedQuery.includes('@')) return 'email';
    // Check if name - contains any alphabetic characters
    if (/[a-zA-Z]/.test(trimmedQuery)) return 'name';
    // Check if numbers with possible spaces, dashes
    if (/^\d[\d\s-]*$/.test(trimmedQuery)) return 'phone';
    // Default to 'name' as fallback:
    return 'name';
  }, []);

  // Search Database:
  const searchCustomerDB = useCallback(
    async (searchQuery: string) => {
      // Check if query has +6 characters or if DB is being called return;
      if (searchQuery.length < 6 || isLoading) return;

      setIsLoading(true);

      try {
        // Identify Search Query Type:
        const queryType: CustomerSearchType = analyseSearchType(searchQuery);
        setLastSearchValue(searchQuery);

        // Prepare query object based on search type:
        const dbQuery: CustomerSearchQuery = {
          queryType,
          queryValue: searchQuery,
        };

        const dbResults: CustomerSearchResult[] = await dynamoDBSearchCustomer(
          dbQuery
        );
        setSearchResults(dbResults);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('TEST: Search failed:', errorMessage);
        //const errorWorkflow = new RaiseErrorWorkflow(`Search failed: ${errorMessage}`);
        //errorWorkflow.execute();
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [analyseSearchType, isLoading]
  );

  // UseEffect with 3/4 second timeout;
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (searchQuery.length >= 6 && !isLoading) {
      timer = setTimeout(() => {
        if (searchQuery !== lastSearchValue) {
          searchCustomerDB(searchQuery);
        }
      }, 500);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchQuery, isLoading, lastSearchValue, searchCustomerDB]);

  // Clear search results
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setLastSearchValue('');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    clearSearch,
    hasResults: searchResults.length > 0,
  };
};

