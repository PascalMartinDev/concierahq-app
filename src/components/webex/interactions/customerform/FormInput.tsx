import React from 'react';
import type { ForwardedRef } from 'react';

export interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  required?: boolean;
  pattern?: string;
  title?: string;
  defaultValue?: string;
  placeholder?: string;
  colSpan?: string;
  errorMessage?: string;
  showError?: boolean;
  ref?: ForwardedRef<HTMLInputElement>;
}


interface FormInputLabelProps {
  id: string;
  label: string;
  required?: boolean;
}

interface FormInputErrorProps {
  id: string;
  errorMessage?: string;
  showError?: boolean;
}

const FormInputLabel: React.FC<FormInputLabelProps> = ({ id, label, required }) => (
  <label
    htmlFor={id}
    className="block text-sm/6 font-medium text-gray-900"
  >
    {label} {required && "(required)"}
  </label>
);

const FormInputError: React.FC<FormInputErrorProps> = ({ id, errorMessage, showError }) => (
  errorMessage ? (
    <div
      id={`${id}-error`}
      className={`text-red-600 text-sm ${showError ? '' : 'hidden'}`}
    >
      {errorMessage}
    </div>
  ) : null
);

const FormInput: React.FC<FormInputProps & { ref?: ForwardedRef<HTMLInputElement> }> = ({
  id,
  name,
  label,
  type = "text",
  required = false,
  pattern,
  title,
  defaultValue,
  placeholder,
  colSpan = "sm:col-span-6",
  errorMessage,
  showError = false,
  ref
}) => {
  return (
    <div className={colSpan}>
      <FormInputLabel id={id} label={label} required={required} />
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          required={required}
          pattern={pattern}
          title={title}
          aria-describedby={errorMessage ? `${id}-error` : undefined}
          ref={ref}
        />
        <FormInputError id={id} errorMessage={errorMessage} showError={showError} />
      </div>
    </div>
  );
};

export default FormInput;


