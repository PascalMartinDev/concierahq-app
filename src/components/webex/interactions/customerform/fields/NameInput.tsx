import React from 'react';
import FormInput from '../FormInput';

export interface NameInputProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
}

const NameInput = React.forwardRef<HTMLInputElement, NameInputProps>(
  ({ id, name, label, defaultValue }, ref) => (
    <FormInput
      id={id}
      name={name}
      label={label}
      type="text"
      required={true}
      defaultValue={defaultValue}
      colSpan="sm:col-span-3"
      ref={ref}
    />
  )
);

NameInput.displayName = 'NameInput';

export default NameInput;

/**
 * NameInput Component
 *
 * A flexible form input component for name fields (first name, last name, etc.).
 * Renders a FormInput component with configurable label and validation.
 *
 * Features:
 * - Configurable field ID, name, and label
 * - Text input type with required validation
 * - Responsive layout (spans 3 columns on small screens and up)
 * - Supports default value initialization
 * - Ref forwarding for form integration
 * - Reusable for different name field types
 *
 * Usage:
 * ```tsx
 * import NameInput from './fields/NameInput';
 *
 * // First name field
 * <NameInput
 *   id="firstName"
 *   name="firstName"
 *   label="First Name"
 *   ref={firstNameRef}
 * />
 *
 * // Last name field with default value
 * <NameInput
 *   id="lastName"
 *   name="lastName"
 *   label="Last Name"
 *   defaultValue="Smith"
 *   ref={lastNameRef}
 * />
 * ```
 *
 * Dependencies:
 * - FormInput: Shared form input component with styling and validation
 * - React.forwardRef: For ref forwarding to the underlying input element
 *
 * Props:
 * - id: string - HTML ID attribute for the input field
 * - name: string - Form field name for data submission
 * - label: string - Display label for the input field
 * - defaultValue?: string - Optional default value for the input
 *
 * @returns JSX.Element - A validated text input field for names
 */
