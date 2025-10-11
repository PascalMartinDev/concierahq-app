import React from 'react';
import { useWorkflow } from '../../workflow/hooks/useWorkflow';

const LoadingApp: React.FC = () => {
  const { loadingMessage } = useWorkflow();

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 text-lg">{loadingMessage}</p>
    </div>
  );
};

export default LoadingApp;

/**
 * DOCUMENTATION: LoadingApp Component
 * 
 * PURPOSE:
 * A React functional component that displays a loading spinner and dynamic message 
 * while the application performs asynchronous operations such as data fetching,
 * API calls, or workflow processing.
 * 
 * FUNCTIONALITY:
 * - Renders a spinning animation with TailwindCSS animations
 * - Displays contextual loading messages from the workflow system
 * - Provides consistent loading UX across the wine retail POS integration
 * 
 * COMPONENT STRUCTURE:
 * - Uses useWorkflow hook to access the current loading message
 * - CSS animation: spinning border element for visual feedback
 * - Responsive design with flexbox centering
 * 
 * INTEGRATION POINTS:
 * - useWorkflow hook: Consumes loadingMessage from workflow context
 * - Used by AppContent when isLoading state is true
 * - Part of the application's state-driven UI rendering system
 * 
 * BUSINESS CONTEXT:
 * In the wine retail POS integration, loading states occur during:
 * - Customer data retrieval from DynamoDB
 * - API Gateway customer profile updates
 * - Lightspeed POS account synchronization
 * - Discount strategy calculations
 * 
 * STYLING:
 * - TailwindCSS: animate-spin for smooth rotation
 * - Blue accent color matching brand theme
 * - Centered layout with appropriate spacing
 * - Responsive text sizing
 * 
 * USAGE PATTERN:
 * Conditionally rendered in AppContent based on workflow loading state:
 * {isLoading && <LoadingApp />}
 */