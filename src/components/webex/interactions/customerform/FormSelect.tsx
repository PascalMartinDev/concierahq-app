import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  options: Array<string | { value: string; label: string }>;
  required?: boolean;
  colSpan?: string;
  selectRef?: React.RefObject<HTMLSelectElement> | React.ForwardedRef<HTMLSelectElement>;
  defaultValue?: string;
  onChange?: (value: string) => void;
}


const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  options,
  required = false,
  colSpan = "sm:col-span-6",
  selectRef,
  defaultValue,
  onChange
}) => {
  // Only show "Required*" if field is required AND has no default value
  const showRequired = required && !defaultValue;

  return (
    <div className={colSpan}>
      <label
        htmlFor={id}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label} {showRequired && <span className="text-red-600">Required*</span>}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <select
          id={id}
          name={name}
          defaultValue={defaultValue}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          required={required}
          ref={selectRef}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={typeof option === 'string' ? option : option.value}>
              {typeof option === 'string' ? option : option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>
    </div>
  );
};

export default FormSelect;