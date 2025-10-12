import React from "react";
import FormInput from "../FormInput";

const PostcodeInput = React.forwardRef<HTMLInputElement, object>(
  (_props, ref) => (
    <FormInput
      id="postal-code"
      name="postal-code"
      label="Postcode"
      type="text"
      required={false}
      colSpan="sm:col-span-2"
      ref={ref}
    />
  )
);

PostcodeInput.displayName = 'PostcodeInput';

export default PostcodeInput;

/**
 * PostcodeInput Component
 * 
 * A form input component for postal code/ZIP code collection.
 * Renders a FormInput component configured for postcode entry.
 * 
 * Features:
 * - Text input type for flexible postcode formats
 * - Optional field (not required for form submission)
 * - Compact responsive layout (spans 2 columns on small screens and up)
 * - Ref forwarding for form integration
 * - Pre-configured field ID and name attributes
 * 
 * Field Configuration:
 * - ID: "postal-code"
 * - Name: "postal-code"
 * - Label: "Postcode"
 * - Type: text
 * - Required: false
 * 
 * Usage:
 * ```tsx
 * import PostcodeInput from './fields/PostcodeInput';
 * 
 * // Basic usage
 * <PostcodeInput ref={postcodeRef} />
 * ```
 * 
 * Note: This component accepts various international postcode formats
 * including UK postcodes (SW1A 1AA), US ZIP codes (12345, 12345-6789),
 * Canadian postal codes (K1A 0A6), and other international formats.
 * 
 * Dependencies:
 * - FormInput: Shared form input component with styling and validation
 * - React.forwardRef: For ref forwarding to the underlying input element
 * 
 * Props: None (component is pre-configured)
 * 
 * @returns JSX.Element - An optional text input field for postcodes
 */