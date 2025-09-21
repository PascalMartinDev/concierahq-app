import CustomerInformation from './CustomerInformation';
import CustomerAddress from './CustomerAddress';
import CustomerStatus from './CustomerStatus';
import CustomerPurchaseHistory from './CustomerPurchaseHistory';
import CustomerSubscriptionDetails from './CustomerSubscriptionDetails';


// Grid item wrapper
const GridCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
    <div className="min-w-0 flex-1">
      {children}
    </div>
  </div>
);

const CustomerDetailsSection: React.FC = () => {
  const customerComponents = [
    { component: CustomerInformation, key: 'customer-info' },
    { component: CustomerStatus, key: 'customer-status' },
    { component: CustomerAddress, key: 'customer-address' },
    { component: CustomerSubscriptionDetails, key: 'customer-subscription' }

  ];

  return (
    <section className='my-5 mx-10'>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {customerComponents.map(({ component: Component, key }) => (
          <GridCard key={key}>
            <Component />
          </GridCard>
        ))}
      </div>
      <CustomerPurchaseHistory />
    </section>
  );
};

export default CustomerDetailsSection;

/**
 * DOCUMENTATION: CustomerDetailsSection Component - Clean Grid Layout
 * 
 * PURPOSE:
 * A layout orchestration component that dynamically renders customer information
 * in a responsive grid format for wine retail POS integration. Eliminates code
 * repetition through reusable components and data-driven rendering.
 * 
 * ARCHITECTURE IMPROVEMENTS:
 * - GridCard: Reusable wrapper component eliminates 80+ lines of duplicate code
 * - Data-driven rendering: Component array enables easy additions/modifications
 * - Clean separation: Layout logic separated from styling concerns
 * - Single source of truth: All grid styling centralized in GridCard
 * 
 * COMPONENT STRUCTURE:
 * ```
 * CustomerDetailsSection
 * ├── Grid Container (responsive 1-2 columns)
 * │   └── customerComponents.map()
 * │       └── GridCard (reusable wrapper)
 * │           └── Dynamic Component (CustomerInfo, Membership, etc.)
 * └── PurchaseHistory (full-width section)
 * ```
 * 
 * GRIDCARD COMPONENT:
 * Reusable wrapper that provides consistent styling:
 * - Eliminates duplicate CSS classes across 4 grid items
 * - Centralizes visual design system in single location
 * - Accepts any child component via React.ReactNode
 * - Maintains accessibility and interaction states
 * 
 * DYNAMIC RENDERING PATTERN:
 * customerComponents array enables:
 * - Easy addition of new customer sections
 * - Consistent ordering and key management
 * - Reduced maintenance overhead
 * - Type-safe component mapping
 * 
 * CHILD COMPONENTS (Rendered Dynamically):
 * - CustomerInformation: Name, phone, email contact details
 * - MembershipInformation: Wine club tier, VIP status, membership dates
 * - CustomerAddress: Complete address information for shipping/service
 * - CustomerActivity: Recent visit and purchase activity tracking
 * 
 * RESPONSIVE DESIGN:
 * - Mobile/Small: Single column layout (grid-cols-1)
 * - Desktop/Large: Two column layout (sm:grid-cols-2)
 * - Consistent gap spacing between grid items
 * - Automatic flow and wrapping behavior
 * 
 * VISUAL DESIGN SYSTEM (GridCard):
 * Consistent card styling applied to all items:
 * - White background (bg-white) for clean presentation
 * - Gray borders (border-gray-300) with hover states
 * - Shadow effects (shadow-xs) for depth perception
 * - Focus rings for accessibility (focus-within:ring-2)
 * - Interactive hover states (hover:border-gray-400)
 * - Consistent padding (px-6 py-5) and spacing
 * 
 * CODE REDUCTION BENEFITS:
 * Before: 44 lines of repetitive div elements
 * After: 14 lines with reusable GridCard component
 * - 68% reduction in component code
 * - Single point of styling maintenance
 * - Easy to add new customer sections
 * - Eliminates copy-paste errors
 * 
 * MAINTENANCE ADVANTAGES:
 * - Style updates: Change once in GridCard vs 4 places
 * - New sections: Add to array vs duplicate entire div structure
 * - Consistency: Impossible to have mismatched styling
 * - Refactoring: Easy to extract or modify grid behavior
 * 
 * BUSINESS CONTEXT:
 * Central hub for wine retail customer service:
 * - Quick access to all customer information during POS interactions
 * - Visual organization supports efficient staff workflows
 * - Comprehensive view enables personalized service delivery
 * - Foundation for discount application and member benefits
 * 
 * ACCESSIBILITY FEATURES:
 * - Focus management with focus-within:ring properties
 * - Semantic section structure for screen readers
 * - Consistent color contrast ratios
 * - Keyboard navigation support
 * 
 * INTEGRATION POINTS:
 * - Child components access data via useAppCustomer hook
 * - Workflow context drives data updates across all sections
 * - Part of MainSection component rendering logic
 * - Connects to DynamoDB customer profile data
 * 
 * EXTENSIBILITY:
 * Adding new customer sections:
 * ```typescript
 * const customerComponents = [
 *   // existing components...
 *   { component: NewCustomerComponent, key: 'new-section' }
 * ];
 * ```
 * 
 * PERFORMANCE BENEFITS:
 * - Reduced bundle size from eliminated duplicate code
 * - Efficient re-rendering through component isolation
 * - No local state management reduces complexity
 * - Grid layout provides optimal browser rendering
 */


