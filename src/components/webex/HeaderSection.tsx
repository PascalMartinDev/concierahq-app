import React, { useEffect, useRef } from 'react';
import logo from '../../assets/TheBrasserieVineyardLogo500x220.png';
import CircleButton from '../ui/CircleButton';
import { StartupWorkflow } from '../../workflow/workflows/StartupWorkflow';
import { useWorkflow } from '../../workflow/hooks/useWorkflow';
import { CloseExtensionWorkflow } from '../../workflow/workflows/CloseExtensionWorkflow';
import { RaiseErrorWorkflow } from '../../workflow/workflows/RaiseErrorWorkflow';

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  onCloseWebExtension?: () => void;
}

const HeaderSection: React.FC<HeaderProps> = ({
  logoSrc = logo,
  logoAlt = 'logo',
  onCloseWebExtension = async () => {
    try {
	  const closeWorkflow = new CloseExtensionWorkflow();
	  await closeWorkflow.execute();
	} catch (error) {
	  const errorMessage = error instanceof Error ? error.message : String(error);
	  const errorWorkflow = new RaiseErrorWorkflow(`Error executing CloseExtensionWorkflow: ${errorMessage}`);
	  errorWorkflow.execute();
	}
  },
}) => {
  // Get workflow context
  const workflowContext = useWorkflow();
  const isInitialized = useRef(false);

  // useEffect to trigger startUpWorkflow when Header component loads:
  useEffect(() => {
    if (!isInitialized.current) {
      const startupWorkflow = new StartupWorkflow(workflowContext);
      startupWorkflow.execute();
      isInitialized.current = true;
    }
  }, [workflowContext]); // Include dependency but prevent re-runs with ref

  return (
    <header className="relative flex items-center justify-center bg-gray-100 p-4 border-b border-gray-200 h-20">
      {/* CircleButton in top-right corner */}
      <div className="absolute top-5 right-10">
        <CircleButton onButtonClick={onCloseWebExtension} />
      </div>

      {/* Centered logo */}
      <img src={logoSrc} alt={logoAlt} className="h-12 object-contain" />
    </header>
  );
};

export default HeaderSection;

/*
=============================================================================
DEVELOPER DOCUMENTATION - HeaderSection Component
=============================================================================

OVERVIEW:
The HeaderSection component serves as the primary header for the LSK Web Extension,
providing centralized branding, initialization logic, and close functionality.

KEY FEATURES:
1. Automatic startup workflow execution on component mount
2. Configurable logo display with fallback defaults
3. Integrated close button with default workflow execution
4. Error handling for workflow failures

PROPS:
- logoSrc (optional): Custom logo image source (defaults to BurchFamilyWinesAllBrandsBW.png)
- logoAlt (optional): Alt text for logo (defaults to 'logo')
- onCloseWebExtension (optional): Custom close handler function

onCloseWebExtension IMPLEMENTATION PATTERN:
The onCloseWebExtension prop uses a default function implementation pattern for several reasons:

1. SELF-CONTAINED FUNCTIONALITY:
   - The header can independently handle web extension closure without requiring
     parent components to provide close logic
   - Ensures the close button always works, even in minimal implementations

2. WORKFLOW INTEGRATION:
   - Default implementation executes CloseExtensionWorkflow which handles:
     * Applying discounts to current account
     * Properly closing the web extension
     * Data cleanup and state management
   
3. ERROR HANDLING:
   - Automatically catches and handles workflow execution errors
   - Triggers RaiseErrorWorkflow to provide user feedback on failures
   - Prevents silent failures that could leave the extension in an inconsistent state

4. FLEXIBILITY:
   - Parent components can override the default behavior by passing their own function
   - Allows for custom close logic while maintaining fallback behavior
   - Supports testing scenarios where different close behaviors may be needed

WORKFLOW EXECUTION:
- StartupWorkflow: Executed once on component mount to initialize the extension
- CloseExtensionWorkflow: Executed when close button is clicked (default behavior)
- RaiseErrorWorkflow: Executed when other workflows fail to provide error feedback

USAGE EXAMPLES:
// Basic usage (uses default close behavior)
<Header />

// Custom logo
<Header logoSrc="/custom-logo.png" logoAlt="Custom Brand" />

// Custom close behavior
<Header onCloseWebExtension={() => console.log('Custom close')} />

ARCHITECTURAL NOTES:
- Uses useWorkflow hook to access workflow context
- Implements ref pattern to prevent duplicate startup workflow execution
- Follows React functional component patterns with TypeScript interfaces
- Integrates with the broader LSK workflow system architecture
=============================================================================
*/
