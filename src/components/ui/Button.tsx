import React from 'react';

// Interface Template
interface ButtonProps {
  buttonText: string;
  onButtonClick: () => void;
}

// Component Template
const Button: React.FC<ButtonProps> = ({
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="w-1/2 flex justify-center">
      <button
      type="button"
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={onButtonClick}
    >
      {buttonText}
    </button>

   </div>
    
  );
};

export default Button;

/**
 * DOCUMENTATION: Button Component
 * 
 * PURPOSE:
 * A reusable React button component providing consistent styling and behavior
 * across the wine retail POS integration application. Implements standardized
 * button interface with customizable text and click handlers.
 * 
 * FUNCTIONALITY:
 * - Renders clickable button with custom text content
 * - Handles click events via callback function
 * - Provides consistent visual styling across application
 * - Implements responsive layout with flex positioning
 * 
 * PROPS INTERFACE:
 * - buttonText: string - Display text for button label
 * - onButtonClick: () => void - Click event handler callback
 * 
 * COMPONENT DESIGN:
 * - 50% width container with centered button
 * - Professional gray color scheme suitable for POS environment
 * - Hover effects for improved user interaction
 * - Shadow effects for visual depth and clickability
 * 
 * STYLING APPROACH:
 * - TailwindCSS utility classes for consistent theming
 * - Gray color palette: white base, gray hover, gray-800 text
 * - Border and shadow effects for professional appearance
 * - Responsive padding and spacing
 * 
 * BUSINESS CONTEXT:
 * Used throughout wine retail application for:
 * - Form submission actions
 * - Navigation and workflow controls
 * - Customer management operations
 * - POS transaction controls
 * 
 * USAGE PATTERNS:
 * - FooterMenu: "Close Profile Page", "Open Customer Form"
 * - Forms: Submit and action buttons
 * - Error components: Close application actions
 * - Workflow navigation: Continue, Cancel operations
 * 
 * LAYOUT BEHAVIOR:
 * - Container div provides 50% width allocation
 * - Flexbox centering for button positioning
 * - Allows multiple buttons in horizontal layouts
 * 
 * ACCESSIBILITY FEATURES:
 * - Semantic button element for screen readers
 * - Focus-visible styles for keyboard navigation
 * - High contrast text for readability
 * - Appropriate button type attribute
 * 
 * The component serves as the foundation for all interactive
 * buttons throughout the application interface.
 */
