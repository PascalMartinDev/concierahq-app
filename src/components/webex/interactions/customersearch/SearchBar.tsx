import React, { useRef, useEffect, forwardRef, useImperativeHandle, memo } from 'react';

interface SearchBarProps {
  customerSearch: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLoading: boolean;
  };
}

interface SearchBarRef {
  maintainFocus: () => void;
}

// SearchBar Component
const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(({ customerSearch }, ref) => {
  const { searchQuery, setSearchQuery, isLoading } = customerSearch;
  const inputRef = useRef<HTMLInputElement>(null);
  const wasTyping = useRef(false);

  // Handle Input change function:
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    wasTyping.current = true;
    setSearchQuery(e.target.value);
  };

  // Expose maintainFocus method to parent
  useImperativeHandle(ref, () => ({
    maintainFocus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }));

  // Maintain focus when results update
  useEffect(() => {
    if (wasTyping.current && inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
      wasTyping.current = false;
    }
  });

  return (
    <div className={"flex mx-auto my-5 max-w-2xl"}>
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={"Search by name, email or phone number..."}
        className="w-full rounded-lg border-2 border-gray-300 bg-white py-4 px-6 pr-12 text-lg text-gray-900 placeholder-gray-400 shadow-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
        disabled={isLoading}
      />
    </div>
  );
});

export default memo(SearchBar, (prevProps, nextProps) => {
  // Only re-render if the props SearchBar actually uses have changed
  return (
    prevProps.customerSearch.searchQuery === nextProps.customerSearch.searchQuery &&
    prevProps.customerSearch.isLoading === nextProps.customerSearch.isLoading
  );
});

/**
 * DOCUMENTATION: SearchBar Component
 * 
 * PURPOSE:
 * A sophisticated React search input component with advanced focus management
 * for customer lookup in wine retail POS integration. Provides real-time search
 * capabilities with optimal user experience during result updates.
 * 
 * FUNCTIONALITY:
 * - Real-time customer search input with controlled value management
 * - Advanced focus management to maintain cursor position during results updates
 * - Loading state handling with input disabling during search operations
 * - Imperative API for parent components to manage focus behavior
 * 
 * COMPONENT ARCHITECTURE:
 * - forwardRef pattern for imperative focus control
 * - useImperativeHandle exposes maintainFocus method to parent
 * - Controlled input with external search state management
 * - TypeScript interfaces for props and ref methods
 * 
 * FOCUS MANAGEMENT SYSTEM:
 * Advanced focus handling prevents common search UX issues:
 * - inputRef: Direct DOM reference for focus control
 * - wasTyping: Tracks user typing to determine when to maintain focus
 * - maintainFocus: Exposed method for parent-triggered focus restoration
 * - useEffect: Automatic focus restoration when results update
 * 
 * PROPS INTERFACE:
 * customerSearch object containing:
 * - searchQuery: Current search string value
 * - setSearchQuery: Function to update search query
 * - isLoading: Boolean indicating search operation in progress
 * 
 * BUSINESS CONTEXT:
 * Critical component for wine retail customer operations:
 * - Customer lookup during POS transactions
 * - Wine club member verification
 * - Contact information search and retrieval
 * - Membership status checking for discount application
 * 
 * SEARCH CAPABILITIES:
 * Supports multiple search criteria:
 * - Customer name (first name, last name)
 * - Email address lookup
 * - Phone number search
 * - Partial matching for efficient discovery
 * 
 * UX DESIGN PATTERNS:
 * - Large, accessible input field optimized for POS terminals
 * - Clear placeholder text explaining search options
 * - Visual feedback during loading states (disabled styling)
 * - Focus management prevents interruption during typing
 * 
 * STYLING APPROACH:
 * - TailwindCSS responsive design (max-w-2xl, centered layout)
 * - Professional POS-appropriate styling (rounded, shadowed)
 * - Focus states with blue accent colors
 * - Disabled states with gray coloring
 * - Large touch-friendly sizing (py-4 px-6)
 * 
 * EVENT HANDLING:
 * handleInputChange function:
 * - Sets wasTyping flag for focus management
 * - Triggers search query update via parent callback
 * - Enables real-time search functionality
 * 
 * IMPERATIVE API:
 * Exposed maintainFocus method allows parent to:
 * - Restore focus after search results update
 * - Prevent focus loss during dynamic content changes
 * - Maintain smooth typing experience
 * 
 * INTEGRATION POINTS:
 * - useCustomerSearch hook: External search state management
 * - LookupCustomerSearch: Parent component with ref management
 * - SearchResultsList: Results display coordination
 * - DynamoDB: Ultimate search data source
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Minimal re-renders through controlled input pattern
 * - Efficient focus management with ref-based DOM access
 * - Loading state prevents unnecessary search operations
 * - forwardRef pattern reduces component coupling
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic input labeling with placeholder
 * - Focus management preserves keyboard navigation
 * - Disabled states provide clear feedback
 * - Large input size supports accessibility standards
 * 
 * USAGE PATTERN:
 * <SearchBar ref={searchBarRef} customerSearch={customerSearch} />
 * 
 * The component exemplifies advanced React patterns for complex user
 * interactions while maintaining clean separation of concerns.
 */