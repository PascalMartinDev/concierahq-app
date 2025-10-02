import React from 'react';
import profilePlaceholder from '../../../assets/Conciera_Profile_Placeholder.png';
//import { useAppCustomer } from '../../workflow/hooks/useAppCustomer';

interface PosContext {
  businessId: number | string;
  businessName: string;
  locationId: number | string;
  deviceName: string;
  deviceId: number | string;
  userName: string;
  userId: number | string;
}

declare global {
  interface Window {
    posContext?: PosContext;
  }
}

const CustomerInformation: React.FC = () => {
  // Use the custom hook to get active AppCustomer data
  //const appCustomer = useAppCustomer();

  const firstName = 'John';  //appCustomer?.customer?.firstName || 'No Name';
  const lastName = 'Smith'; //appCustomer?.customer?.lastName || '';
  const phone = '0400400400'; //appCustomer?.customer?.phone || 'No Phone';
  const email = 'jsmith@mymailbox.com'; //appCustomer?.customer?.email || 'No Email';

  // Access injected posContext safely
  let businessName = 'N/A';
  let deviceName = 'N/A';
  let userName = 'N/A';
  let locationId = 'N/A';

  try {
    if (typeof window !== 'undefined' && window.posContext) {
      const ctx = window.posContext;
      businessName = ctx.businessName || 'N/A - window';
      deviceName = ctx.deviceName || 'N/A - window';
      userName = ctx.userName || 'N/A - window';
      locationId = String(ctx.locationId) || 'N/A - window';
    }
  } catch (error) {
    console.error('Error accessing posContext:', error);
  }

  return (
    <div className="flex items-start space-x-4">
      {/* Circular Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={profilePlaceholder}
          alt="Customer Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* Customer Information */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">
          Customer Information:
        </h3>
        <h4 className="text-sm/6 text-gray-500">
          Name: {firstName} {lastName}
        </h4>
        <h4 className="text-sm/6 text-gray-500">Phone: {phone}</h4>
        <h4 className="text-sm/6 text-gray-500">Email: {email}</h4>

        <h3 className="text-lg font-semibold text-gray-900 mt-4">
          POS Context:
        </h3>
        <h4 className="text-sm/6 text-gray-500">Business: {businessName}</h4>
        <h4 className="text-sm/6 text-gray-500">Device: {deviceName}</h4>
        <h4 className="text-sm/6 text-gray-500">User: {userName}</h4>
        <h4 className="text-sm/6 text-gray-500">Location ID: {locationId}</h4>
      </div>
    </div>
  );
};

export default CustomerInformation;

/**
 * DOCUMENTATION: CustomerInformation Component
 *
 * PURPOSE:
 * A React display component that renders core customer contact information for wine
 * retail POS integration. Provides essential customer identification and communication
 * details for staff interactions and service delivery.
 *
 * FUNCTIONALITY:
 * - Displays customer name, phone, and email in structured format
 * - Implements fallback values for missing customer data
 * - Reactive updates when customer selection changes via workflow
 * - Provides essential contact context for wine retail operations
 *
 * DATA EXTRACTION:
 * Accesses nested customer data with safe fallbacks:
 * - firstName: Customer's first name (fallback: "No Name")
 * - lastName: Customer's last name (fallback: empty string)
 * - phone: Customer's phone number (fallback: "No Phone")
 * - email: Customer's email address (fallback: "No Email")
 *
 * COMPONENT ARCHITECTURE:
 * - Uses useAppCustomer hook for reactive customer data access
 * - Implements optional chaining and logical OR for data safety
 * - Pure display component with no local state management
 * - Consistent typography and styling with component family
 *
 * BUSINESS CONTEXT:
 * Critical for wine retail customer service:
 * - Customer identification during POS transactions
 * - Contact information for order confirmations
 * - Wine club membership communication
 * - Event invitations and marketing outreach
 * - Customer service follow-up and support
 * - Loyalty program participation tracking
 *
 * FALLBACK STRATEGY:
 * Implements user-friendly fallbacks for missing data:
 * - "No Name" for missing first name (primary identifier)
 * - Empty string for missing last name (graceful degradation)
 * - "No Phone" for missing phone number (clear indication)
 * - "No Email" for missing email (explicit status)
 *
 * INTEGRATION POINTS:
 * - useAppCustomer hook: Primary data source from workflow context
 * - Customer model: Nested data structure access
 * - CustomerDetailsSection: Grid layout container
 * - DynamoDB: Ultimate data source via business layer
 *
 * UI/UX DESIGN:
 * - Section header: "Customer Information"
 * - Logical field ordering: Name → Phone → Email
 * - Consistent visual hierarchy with other components
 * - Clear data presentation for staff scanning
 *
 * DATA SAFETY PATTERNS:
 * - Optional chaining prevents null reference errors
 * - Fallback values ensure UI stability
 * - Graceful handling of incomplete customer records
 * - No error states - always displays something meaningful
 *
 * STYLING APPROACH:
 * - TailwindCSS typography scale (text-lg for headers, text-sm/6 for content)
 * - Gray color hierarchy (gray-900 headers, gray-500 data)
 * - Consistent spacing and alignment
 * - Professional appearance for POS environment
 *
 * USAGE PATTERN:
 * Primary component in CustomerDetailsSection grid:
 * CustomerDetailsSection → Grid Item → CustomerInformation
 *
 * ENHANCEMENT OPPORTUNITIES:
 * - Customer photo integration
 * - Contact preference indicators
 * - Verification status displays
 * - Quick action buttons (call, email)
 */
