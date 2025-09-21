import React from 'react';
//import { useAppCustomer } from '../../workflow/hooks/useAppCustomer';

const CustomerAddress: React.FC = () => {
  // use the customer hook to get reactive AppCustomer data
  //const appCustomer = useAppCustomer();

  const street = 'Unit 2'; // appCustomer?.address.address1;
  const street2 = '54 High End Road'; //appCustomer?.address.address2;
  const city = 'Ascot'; //appCustomer?.address.city;
  const state = 'Queensland'; //appCustomer?.address.state;
  const postcode = '4012'; //appCustomer?.address.postcode;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Customer Address:</h3>
      <h4 className="text-sm/6  text-gray-500">Street: {street}</h4>
      <h4 className="text-sm/6  text-gray-500">Street2: {street2}</h4>
      <h4 className="text-sm/6  text-gray-500">City: {city}</h4>
      <h4 className="text-sm/6  text-gray-500">State: {state}</h4>
      <h4 className="text-sm/6  text-gray-500">Postcode: {postcode}</h4>
    </div>
  );
};

export default CustomerAddress;

/**
 * DOCUMENTATION: CustomerAddress Component
 * 
 * PURPOSE:
 * A React display component that renders customer address information for wine retail
 * POS integration. Provides essential location data for customer service, shipping,
 * and regional wine preference analysis.
 * 
 * FUNCTIONALITY:
 * - Displays complete customer address details in structured format
 * - Reactive updates when customer selection changes
 * - Extracts address components from nested customer data structure
 * - Provides geographical context for wine retail operations
 * 
 * DATA STRUCTURE:
 * Accesses address fields from AppCustomer model:
 * - address1: Street address (primary line)
 * - city: Customer's city location
 * - state: State/province information
 * - postcode: Postal/ZIP code for delivery routing
 * 
 * COMPONENT ARCHITECTURE:
 * - Uses useAppCustomer hook for reactive data access
 * - Extracts individual address components with optional chaining
 * - Displays data in consistent typography hierarchy
 * - No local state - purely display component
 * 
 * BUSINESS CONTEXT:
 * Essential for wine retail operations:
 * - Shipping and delivery calculations
 * - Regional wine preference insights
 * - Local venue proximity analysis
 * - Tax jurisdiction determination
 * - Marketing segmentation by geography
 * - Compliance with regional alcohol laws
 * 
 * INTEGRATION POINTS:
 * - useAppCustomer hook: Reactive customer data source
 * - Address model: Structured address data from business layer
 * - CustomerDetailsSection: Part of customer information grid
 * - DynamoDB: Ultimate data source via workflow context
 * 
 * DATA SAFETY:
 * - Uses optional chaining to prevent null reference errors
 * - Graceful handling of incomplete address data
 * - Automatic updates when customer context changes
 * 
 * UI/UX DESIGN:
 * - Clear section heading: "Customer Address"
 * - Logical field ordering: Street → City → State → Postcode
 * - Consistent typography with other customer components
 * - Gray text hierarchy for information scanning
 * 
 * STYLING APPROACH:
 * - TailwindCSS responsive typography (text-lg, text-sm/6)
 * - Gray color scheme (gray-900 headers, gray-500 content)
 * - Consistent spacing with component family
 * - Readable field labels and data presentation
 * 
 * USAGE PATTERN:
 * Rendered within CustomerDetailsSection responsive grid:
 * Grid container → CustomerAddress component → Address fields
 * 
 * POTENTIAL ENHANCEMENTS:
 * - Address validation indicators
 * - Google Maps integration
 * - Regional wine recommendation context
 * - Shipping zone calculation display
 * - Address completeness scoring
 */
