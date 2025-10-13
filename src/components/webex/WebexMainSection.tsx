import CustomerManagementSection from "./interactions/CustomerManagementSection";
import CustomerMainSection from "./customer/CustomerMainSection.tsx";
import { useWorkflow } from "../../workflow/hooks/useWorkflow";

const WebexMainSection: React.FC = () => {
  const { showCreateForm, showSearchBox } = useWorkflow();

  return (

    <>
      {/* Show Customer Details Section if either Form or search box is true */}
      { !showCreateForm && !showSearchBox &&  <CustomerMainSection /> }
      {/* Show Search Customer Management Section is either Form or search box is true */}
      {(showCreateForm || showSearchBox) &&  <CustomerManagementSection />}
    </>
  );
};

export default WebexMainSection;


/**
 * DOCUMENTATION: MainSection Component
 * 
 * PURPOSE:
 * The central content coordinator component that manages the display of different
 * functional sections based on user workflow state. Acts as the primary content
 * switcher for customer management operations in the wine retail POS integration.
 * 
 * FUNCTIONALITY:
 * - Conditionally renders customer details vs. management interfaces
 * - Provides seamless transitions between viewing and editing modes
 * - Integrates customer information display with search/form interactions
 * - Implements clean state-driven UI switching logic
 * 
 * COMPONENT ARCHITECTURE:
 * Two primary modes controlled by workflow state:
 * 1. Customer Details Mode: Display existing customer information
 * 2. Management Mode: Search for customers or create/edit profiles
 * 
 * STATE-DRIVEN RENDERING:
 * - Default State: Shows CustomerDetailsSection (customer info display)
 * - Form State: Shows CustomerManagementSection (create/edit forms)
 * - Search State: Shows CustomerManagementSection (search interface)
 * - Mixed State: Management section takes precedence over details
 * 
 * INTEGRATION POINTS:
 * - useWorkflow hook: Accesses showCreateForm and showSearchBox state
 * - CustomerDetailsSection: Displays current customer information
 * - CustomerManagementSection: Handles search and form operations
 * 
 * BUSINESS CONTEXT:
 * Core interface for wine retail customer operations:
 * - Wine club member lookup and verification
 * - Customer profile creation and updates
 * - Discount eligibility verification
 * - Account information synchronization with Lightspeed POS
 * 
 * WORKFLOW STATES:
 * - Normal View: Customer details with membership info and activity
 * - Search Mode: Customer lookup interface with search results
 * - Form Mode: New customer creation or existing customer editing
 * - Transition handling between all states
 * 
 * UI FLOW PATTERNS:
 * 1. Load → Customer Details (default)
 * 2. Search → Customer Management (search interface)
 * 3. Create → Customer Management (form interface)  
 * 4. Edit → Customer Management (populated form)
 * 5. Cancel/Save → Back to Customer Details
 * 
 * RESPONSIVE DESIGN:
 * - Optimized for POS terminal screen dimensions
 * - Clean section transitions without layout shifts
 * - Consistent spacing and component alignment
 * 
 * The component serves as the primary workflow coordinator between
 * customer information display and interactive management operations.
 */
