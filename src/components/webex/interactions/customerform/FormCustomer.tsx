// src/components/interactions/AddUpdateCustomerForm.tsx
import React, { useRef, useEffect } from 'react';
import { useWorkflow } from '../../../../workflow/hooks/useWorkflow';
import { useAppCustomer } from '../../../../workflow/hooks/useAppCustomer';
import { SubmitCustomerFormWorkflow } from '../../../../workflow/workflows/SubmitCustomerFormWorkflow';
import { setGlobalAppCustomer } from '../../../../workflow/context/workflowContextInstance';
import { RaiseErrorWorkflow } from '../../../../workflow/workflows/RaiseErrorWorkflow';
import CircleButton from '../../../ui/CircleButton';
import FormHeading from './FormHeading';
import NameInput from './fields/NameInput';
import EmailInput from './fields/EmailInput';
import PhoneInput from './fields/PhoneInput';
import GroupSelectInput from './fields/GroupSelectInput';
import AddressInput from './fields/AddressInput';


const FormCustomer: React.FC = () => {
  // Use the custom hook to get current App Customer data
  const appCustomer = useAppCustomer();
  const { setShowCreateForm } = useWorkflow();

  // Pre-Populated Values:
  const valueFirstName =
    appCustomer?.customer?.firstName ||
    appCustomer?.currentAccount?.consumer?.firstName ||
    '';
  const valueLastName =
    appCustomer?.customer?.lastName ||
    appCustomer?.currentAccount?.consumer?.lastName ||
    '';
  const valueEmail =
    appCustomer?.customer?.email ||
    appCustomer?.currentAccount?.consumer?.email ||
    '';
  const valuePhone =
    appCustomer?.customer?.phone ||
    appCustomer?.currentAccount?.consumer?.phoneNumber1 ||
    '';

  // From HtmlInput Elements
  const formInputFirstName = useRef<HTMLInputElement>(null);
  const formInputLastName = useRef<HTMLInputElement>(null);
  const formInputEmail = useRef<HTMLInputElement>(null);
  const formInputPhone = useRef<HTMLInputElement>(null);
  const formInputGroup = useRef<HTMLSelectElement>(null);
  const formInputStreet1 = useRef<HTMLInputElement>(null);
  const formInputStreet2 = useRef<HTMLInputElement>(null);
  const formInputCity = useRef<HTMLInputElement>(null);
  const formInputPostcode = useRef<HTMLInputElement>(null);
  const [selectedCountry, setSelectedCountry] = React.useState<{ name: string; isoCode: string }>({
    name: 'Australia',
    isoCode: 'AU',
  });
  const [selectedState, setSelectedState] = React.useState<string>('');
  const [selectedGroup, setSelectedGroup] = React.useState<string>('Loyalty');
  const [isAddressRequired, setIsAddressRequired] = React.useState<boolean>(false);

  // Update address required state when group changes
  useEffect(() => {
    setIsAddressRequired(selectedGroup !== 'Loyalty');
  }, [selectedGroup]);

  // Handler for group selection change
  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
  };

  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      // Validate dependencies first
      if (!appCustomer) {
        throw new Error('No AppCustomer found');
      }

      // Extract and validate form values
      const formData = extractFormData();
      validateFormData(formData);

      // Update customer data
      updateCustomerData(formData);

      // Submit the form
      await executeSubmitWorkflow();
      
    } catch (error) {
      await handleSubmitError(error);
    }
  };

  const extractFormData = () => {
    // Safe extraction with null checks
    const firstName = formInputFirstName.current?.value?.trim() || '';
    const lastName = formInputLastName.current?.value?.trim() || '';
    const email = formInputEmail.current?.value?.trim() || '';
    const phone = formInputPhone.current?.value?.trim() || '';
    const address1 = formInputStreet1.current?.value?.trim() || '';
    const address2 = formInputStreet2.current?.value?.trim() || '';
    const city = formInputCity.current?.value?.trim() || '';
    const postcode = formInputPostcode.current?.value?.trim() || '';
    const state = selectedState || '';
    const country = selectedCountry || '';
    const group = formInputGroup.current?.value || '';

    return {
      firstName,
      lastName,
      email,
      phone,
      postcode,
      address1,
      address2,
      city,
      state,
      country,
      group
    };
  };

  const validateFormData = (data: ReturnType<typeof extractFormData>) => {
    const errors: string[] = [];

    // Required field validation
    if (!data.firstName) errors.push('First name is required');
    if (!data.lastName) errors.push('Last name is required');
    if (!data.email) errors.push('Email is required');
    if (!data.phone) errors.push('Phone number is required');
    if (!data.group) errors.push('Group/Membership is required');

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }

    // Phone format validation
    const phoneRegex = /^\+?[0-9\s-]{10,20}$/;
    if (data.phone && !phoneRegex.test(data.phone)) {
      errors.push('Invalid phone number format');
    }

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  };

  const updateCustomerData = (data: ReturnType<typeof extractFormData>) => {
    if (!appCustomer) return;

    // Update customer information
    appCustomer.customer.firstName = data.firstName;
    appCustomer.customer.lastName = data.lastName;
    appCustomer.customer.email = data.email;
    appCustomer.customer.phone = data.phone;
    appCustomer.group = data.group;

    // Update address information
    appCustomer.customer.address.address1 = data.address1;
    appCustomer.customer.address.address2 = data.address2;
    appCustomer.customer.address.city = data.city;
    appCustomer.customer.address.state = data.state;
    appCustomer.customer.address.country = data.country.name;
    appCustomer.customer.address.postcode = data.postcode;

    // Update global customer state
    setGlobalAppCustomer(appCustomer);
  };

  const executeSubmitWorkflow = async () => {
    const submitWorkflow = new SubmitCustomerFormWorkflow();
    await submitWorkflow.execute();
  };

  const handleSubmitError = async (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorWorkflow = new RaiseErrorWorkflow(`Customer form submission failed: ${errorMessage}`);
    await errorWorkflow.execute();
  };

  // Function to Handle on Close Form Button Clicked:
  const handleCloseFormButtonClick = () => setShowCreateForm(false);

  return (
    <section className="m-5 shadow-lg rounded-lg">
      <div className="relative flex items-center justify-center bg-gray-100 p-4 border-b border-gray-200 h-20">
        {/* CircleButton in top-right corner */}
        <div className="absolute top-5 right-10">
          <CircleButton onButtonClick={handleCloseFormButtonClick} />
        </div>
        < FormHeading title={"Add / Update Customer"} />
      </div>
      {/* Add or Update Member Form Section */}
      <div className="m-10">
        <form onSubmit={submitHandler}>
          <div className="space-y-12">
            <div className=" pb-10">
             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* First Name input field */}
                <NameInput 
                  id="first-name"
                  name="first-name"
                  label="First Name"
                  defaultValue={valueFirstName}
                  ref={formInputFirstName}
                />    
                {/* Last Name input field */}
                <NameInput 
                  id="last-name"
                  name="last-name"
                  label="Last Name"
                  defaultValue={valueLastName}
                  ref={formInputLastName}
                /> 
                {/* Email input field */}
                <EmailInput
                  defaultValue={valueEmail}
                  ref={formInputEmail}
                />
                {/* Phone input field */}
                <PhoneInput
                  defaultValue={valuePhone}
                  ref={formInputPhone}
                />
                {/* Group input field */}
                <GroupSelectInput
                  ref={formInputGroup}
                  onChange={handleGroupChange}
                />
                
                {/* Address Component */}
                <AddressInput
                  isRequired={isAddressRequired}
                  formInputStreet1={formInputStreet1}
                  formInputStreet2={formInputStreet2}
                  formInputCity={formInputCity}
                  formInputPostcode={formInputPostcode}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  selectedState={selectedState}
                  setSelectedState={setSelectedState}
                
                />
                
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full pb-10">
            <button
              type="submit"
              className={
                'w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
              }
            >
              Submit Customer Details!
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormCustomer;

