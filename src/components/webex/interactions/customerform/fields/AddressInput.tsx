import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type CountryOption = { name: string; isoCode: string };

interface AddressFormProps {
  isRequired: boolean;
  formInputStreet1: React.RefObject<HTMLInputElement | null>;
  formInputStreet2: React.RefObject<HTMLInputElement | null>;
  formInputCity: React.RefObject<HTMLInputElement | null>;
  formInputPostcode: React.RefObject<HTMLInputElement | null>;
  selectedCountry: CountryOption;
  setSelectedCountry: (country: CountryOption) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
}

const AddressInput: React.FC<AddressFormProps> = ({
  isRequired,
  formInputStreet1,
  formInputStreet2,
  formInputCity,
  formInputPostcode,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
}) => {
  const [stateList, setStateList] = useState<
    Array<{ name: string; isoCode: string; countryCode?: string }>
  >([]);

  useEffect(() => {
    if (selectedCountry?.isoCode) {
      const states = State.getStatesOfCountry(selectedCountry.isoCode);
      setStateList(states);
    }
  }, [selectedCountry]);

  return (
    <>
      {/* Street 1 */}
      <div className="sm:col-span-3">
        <label className="block text-sm/6 font-medium text-gray-900">
          Street Address 1 {isRequired && <span className="text-red-600">Required*</span>}
        </label>
        <div className="mt-2">
          <input
            type="text"
            ref={formInputStreet1}
            required={isRequired}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {/* Street 2 */}
      <div className="sm:col-span-3">
        <label className="block text-sm/6 font-medium text-gray-900">
          Street Address 2 (Optional)
        </label>
        <div className="mt-2">
          <input
            type="text"
            ref={formInputStreet2}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {/* City */}
      <div className="sm:col-span-3">
        <label className="block text-sm/6 font-medium text-gray-900">
          City {isRequired && <span className="text-red-600">Required*</span>}
        </label>
        <div className="mt-2">
          <input
            type="text"
            ref={formInputCity}
            required={isRequired}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {/* Country */}
      <div className="sm:col-span-3">
        <label className="block text-sm/6 font-medium text-gray-900">
          Country {isRequired && <span className="text-red-600">Required*</span>}
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            value={selectedCountry.isoCode}
            onChange={(e) => {
              const updatedCountry = Country.getAllCountries().find(
                (c) => c.isoCode === e.target.value
              );
              if (updatedCountry) {
                setSelectedCountry({
                  name: updatedCountry.name,
                  isoCode: updatedCountry.isoCode
                });
              }
            }}
          >
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
      </div>

      {/* State */}
      <div className="sm:col-span-3">
        <label className="block text-sm/6 font-medium text-gray-900">
          State / Region {isRequired && <span className="text-red-600">Required*</span>}
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {stateList.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
      </div>

      {/* Postcode */}
      <div className="sm:col-span-2">
        <label className="block text-sm/6 font-medium text-gray-900">
          Postcode {isRequired && <span className="text-red-600">Required*</span>}
        </label>
        <div className="mt-2">
          <input
            type="text"
            ref={formInputPostcode}
            required={isRequired}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
    </>
  );
};

export default AddressInput;
