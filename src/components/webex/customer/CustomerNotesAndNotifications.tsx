import React from 'react';
import { useAppCustomer } from '../../../workflow/hooks/useAppCustomer';
import TagList from '../../ui/TagList';
import Notes from '../../ui/Notes';

const CustomerNotesAndNotifications: React.FC = () => {
  const appCustomer = useAppCustomer();

  // Commerce Variable:
  const commerceNotifications = appCustomer?.commerceSeven.notifications || [];

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">

        <div className="flex-1 space-y-2">
          <Notes />
        </div>

        {/* Conditionally render the next 3 TagList sections if ecommerce is 'commerce7' */}
      {import.meta.env.VITE_INTEGRATION_ECOMMERCE === "Commerce7" ? (
        <>
          <div className="flex-1 space-y-2">
            <TagList title={"Notifications"} tags={commerceNotifications}/>
          </div>
        </>
      ) : null}
      </div>
    </div>
  );
};

export default CustomerNotesAndNotifications;