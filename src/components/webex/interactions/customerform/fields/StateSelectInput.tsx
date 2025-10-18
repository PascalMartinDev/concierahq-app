import React from "react";
import FormSelect from "../FormSelect";

const StateSelectInput = React.forwardRef<HTMLSelectElement, object>(
  (_props, ref) => (
    <FormSelect
      id="state"
      name="state"
      label="State"
      required={false}
      colSpan="sm:col-span-2"
      selectRef={ref}
      options={[
        { value: "AU-WA", label: "Western Australia" },
        { value: "AU-SA", label: "South Australia" },
        { value: "AU-VIC", label: "Victoria" },
        { value: "AU-NSW", label: "New South Wales" },
        { value: "AU-ACT", label: "Australian Capital Territory" },
        { value: "AU-QLD", label: "Queensland" },
        { value: "AU-TAS", label: "Tasmania" },
        { value: "AU-NT", label: "Northern Territory" }
      ]}
    />
  )
);

StateSelectInput.displayName = 'StateSelect';

export default StateSelectInput;

/**
 * StateSelect Component
 * 
 * A dropdown selection component for Australian state and territory selection.
 * Renders a FormSelect component with predefined Australian state options.
 * 
 * Features:
 * - Pre-configured with all Australian states and territories
 * - Optional field (not required for form submission)
 * - Empty option available for no selection
 * - Compact responsive layout (spans 2 columns on small screens and up)
 * - Ref forwarding for form integration
 * 
 * Available Options:
 * - "" (empty/no selection)
 * - AU-WA: Western Australia
 * - AU-SA: South Australia
 * - AU-VIC: Victoria
 * - AU-NSW: New South Wales
 * - AU-ACT: Australian Capital Territory
 * - AU-QLD: Queensland
 * - AU-TAS: Tasmania
 * - AU-NT: Northern Territory
 * 
 * Field Configuration:
 * - ID: "state"
 * - Name: "state"
 * - Label: "State"
 * - Required: false
 * 
 * Usage:
 * ```tsx
 * import StateSelect from './fields/StateSelect';
 * 
 * // Basic usage
 * <StateSelect ref={stateRef} />
 * ```
 * 
 * Note: This component is specifically designed for Australian addresses.
 * All 8 states and territories are included in alphabetical order with
 * an empty option for cases where state selection is not applicable.
 * 
 * Dependencies:
 * - FormSelect: Shared form select component with styling and functionality
 * - React.forwardRef: For ref forwarding to the underlying select element
 * 
 * Props: None (component is pre-configured)
 * 
 * @returns JSX.Element - An optional dropdown for Australian state selection
 */

