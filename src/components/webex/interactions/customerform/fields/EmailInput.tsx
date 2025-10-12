import React from "react";
import FormInput from "../FormInput";

export interface EmailInputProps {
  defaultValue?: string;
}

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ defaultValue }, ref) => (
    <FormInput
      id="email"
      name="email"
      label="Email Address"
      type="email"
      required={true}
      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
      defaultValue={defaultValue}
      colSpan="sm:col-span-6"
      ref={ref}
      errorMessage="Please enter a valid email address (e.g., user@example.com)."
    />
  )
);

EmailInput.displayName = 'EmailInput';

export default EmailInput;

/**
 * EmailInput Component
 * 
 * A specialized form input component for email address collection.
 * Renders a FormInput component with email-specific validation and configuration.
 * 
 * Features:
 * - HTML5 email input type with built-in browser validation
 * - Custom regex pattern validation for email format
 * - Required field validation
 * - Custom error message for invalid email formats
 * - Full-width responsive layout (spans 6 columns)
 * - Supports default value initialization
 * - Ref forwarding for form integration
 * 
 * Validation:
 * - Pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
 * - Requires valid email format (user@domain.com)
 * - Shows custom error message on validation failure
 * 
 * Usage:
 * ```tsx
 * import EmailInput from './fields/EmailInput';
 * 
 * // Basic usage
 * <EmailInput ref={emailRef} />
 * 
 * // With default value
 * <EmailInput defaultValue="customer@example.com" ref={emailRef} />
 * ```
 * 
 * Dependencies:
 * - FormInput: Shared form input component with styling and validation
 * - React.forwardRef: For ref forwarding to the underlying input element
 * 
 * Props:
 * - defaultValue?: string - Optional default email address value
 * 
 * @returns JSX.Element - A validated email input field
 */


