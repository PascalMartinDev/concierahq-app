import React from "react";
import FormSelect from "../FormSelect";

const GroupSelectInput = React.forwardRef<HTMLSelectElement, object>(
  (_props , ref) => (
    <FormSelect
      id="group"
      name="group"
      label="Group / Membership"
      required={true}
      colSpan="sm:col-span-2"
      selectRef={ref}
      defaultValue="VIP"
      options={[
        "Subscription Club A",
        "Subscription Club B",
        "VIP",
        "Staff",
        "Frieds and Family"
      ]}
    />
  )
);

GroupSelectInput.displayName = 'GroupSelect';

export default GroupSelectInput;

/**
 * GroupSelect Component
 * 
 * A dropdown selection component for customer group/membership selection.
 * Renders a FormSelect component with predefined group options.
 * 
 * Features:
 * - Pre-configured with Wine Club, Friends of The Burches, and Staff options
 * - Wine Club is set as the default selected value
 * - Required field validation
 * - Responsive grid layout (spans 2 columns on small screens and up)
 * - Supports ref forwarding for form integration
 * 
 * Usage:
 * ```tsx
 * import GroupSelect from './fields/GroupSelect';
 * 
 * // In a form
 * <GroupSelect ref={groupSelectRef} />
 * ```
 * 
 * Dependencies:
 * - FormSelect: Shared form select component with styling and functionality
 * - React.forwardRef: For ref forwarding to the underlying select element
 * 
 * Props: None (component is pre-configured)
 * 
 * @returns JSX.Element - A form select dropdown for group selection
 */
