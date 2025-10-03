import { useRef, useEffect } from 'react';
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import { useCustomerSearch } from '../../../workflow/hooks/useCustomerSearch';

const LookupCustomerSearch = () => {
  const customerSearch = useCustomerSearch();
  const searchBarRef = useRef<{ maintainFocus: () => void }>(null);
  
  // Maintain focus when results change
  useEffect(() => {
    if (customerSearch.hasResults && searchBarRef.current) {
      searchBarRef.current.maintainFocus();
    }
  }, [customerSearch.hasResults]);
  
  return (
    <div>
      <div>
        <SearchBar ref={searchBarRef} customerSearch={customerSearch} />
      </div>
      <div>
        <SearchResultsList customerSearch={customerSearch} />
      </div>
      
    </div>
  )
}

export default LookupCustomerSearch;

/**
 * DOCUMENTATION: LookupCustomerSearch Component
 * 
 * PURPOSE:
 * A React orchestration component that combines search input and results display
 * for customer lookup functionality in wine retail POS integration. Manages
 * focus behavior and coordinates between search input and results presentation.
 * 
 * FUNCTIONALITY:
 * - Orchestrates SearchBar and SearchResultsList components
 * - Manages focus maintenance during search result updates
 * - Integrates with useCustomerSearch hook for search state
 * - Provides seamless search experience for POS operations
 * 
 * COMPONENT COORDINATION:
 * - SearchBar: Handles search input and query management
 * - SearchResultsList: Displays and manages search results
 * - Focus management via ref system between components
 * 
 * FOCUS MANAGEMENT:
 * Advanced UX pattern for search interfaces:
 * - searchBarRef: Reference to SearchBar's maintainFocus method
 * - useEffect: Triggers focus maintenance when results appear
 * - Prevents cursor jumping during dynamic content updates
 * 
 * BUSINESS CONTEXT:
 * Central component for customer lookup workflow:
 * - Customer identification during POS transactions
 * - Wine club member verification
 * - Discount eligibility checking
 * - Contact information retrieval
 * 
 * INTEGRATION POINTS:
 * - useCustomerSearch hook: Search state and operations
 * - SearchBar: Input handling and focus management
 * - SearchResultsList: Results display and selection
 * - Workflow context: Customer data management
 * 
 * UX DESIGN PATTERN:
 * Implements smooth search-as-you-type experience:
 * 1. User types in SearchBar
 * 2. Results appear in SearchResultsList
 * 3. Focus maintained in SearchBar for continued typing
 * 4. Customer selection loads full profile
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - Minimal component overhead
 * - Efficient ref-based focus management
 * - Child components handle their own optimizations
 */