import React from "react";
import FormInput from "../FormInput";

export interface PhoneInputProps {
  defaultValue?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ defaultValue }, ref) => (
    <FormInput
      id="phone"
      name="phone"
      label="Mobile Number"
      type="tel"
      required={true}
      pattern="^\+?[0-9\s-]{10,20}$"
      title="Enter a valid phone number"
      defaultValue={defaultValue}
      colSpan="sm:col-span-6"
      ref={ref}
    />
  )
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;

/**
 * PhoneInput Component
 * 
 * A specialized form input component for mobile phone number collection.
 * Renders a FormInput component with phone-specific validation and configuration.
 * 
 * Features:
 * - HTML5 telephone input type (tel) for mobile keyboards
 * - Custom regex pattern validation for phone number format
 * - Required field validation
 * - Custom title attribute for validation hints
 * - Full-width responsive layout (spans 6 columns)
 * - Supports default value initialization
 * - Ref forwarding for form integration
 * 
 * Validation:
 * - Pattern: ^\+?[0-9\s-]{10,20}$
 * - Accepts numbers, spaces, hyphens, and optional leading +
 * - Length between 10-20 characters
 * - Shows "Enter a valid phone number" hint on validation failure
 * 
 * Accepted Formats:
 * - 1234567890
 * - 123-456-7890
 * - 123 456 7890
 * - +1 123 456 7890
 * - +44 20 7946 0958
 * 
 * Usage:
 * ```tsx
 * import PhoneInput from './fields/PhoneInput';
 * 
 * // Basic usage
 * <PhoneInput ref={phoneRef} />
 * 
 * // With default value
 * <PhoneInput defaultValue="+1 555 123 4567" ref={phoneRef} />
 * ```
 * 
 * Dependencies:
 * - FormInput: Shared form input component with styling and validation
 * - React.forwardRef: For ref forwarding to the underlying input element
 * 
 * Props:
 * - defaultValue?: string - Optional default phone number value
 * 
 * @returns JSX.Element - A validated telephone input field
 */


