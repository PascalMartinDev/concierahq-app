import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";

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
        <label className="block text-sm font-medium text-gray-700">
          Street Address 1 {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          ref={formInputStreet1}
          required={isRequired}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500"
        />
      </div>

      {/* Street 2 */}
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">
          Street Address 2 (Optional)
        </label>
        <input
          type="text"
          ref={formInputStreet2}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500"
        />
      </div>

      {/* City */}
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">
          City {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          ref={formInputCity}
          required={isRequired}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500"
        />
      </div>

      {/* Country */}
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">
          Country {isRequired && <span className="text-red-500">*</span>}
        </label>
        <select
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500"
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
      </div>

      {/* State */}
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">
          State / Region {isRequired && <span className="text-red-500">*</span>}
        </label>
        <select
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500"
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
      </div>

      {/* Postcode */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Postcode {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          ref={formInputPostcode}
          required={isRequired}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default AddressInput;
