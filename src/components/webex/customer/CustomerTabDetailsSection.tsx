import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { 
  TagIcon,
  MapPinIcon, 
  ShoppingCartIcon, 
  CalendarIcon, 
  AdjustmentsHorizontalIcon,
  CreditCardIcon,
  PencilSquareIcon
} from '@heroicons/react/20/solid';
import CustomerAddress from './CustomerAddress';
import CustomerPurchaseHistory from './CustomerPurchaseHistory';
import CustomerCustomFields from './CustomerCustomFields';
import CustomerBookings from './CustomerBookings';
import CustomerSegments from './CustomerSegments';
import CustomerCreditCards from './creditcards/CustomerCreditCards';
import CustomerNotesAndNotifications from './notes/CustomerNotesAndNotifications';


// Type definitions
interface Tab {
  name: string;
  component: React.FC;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}


function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const CustomerTabDetailsSection: React.FC = () => {
  const tabs: Tab[] = [
    { name: 'Segments', component: CustomerSegments, icon: TagIcon },
    { name: 'Bookings', component: CustomerBookings, icon: CalendarIcon },
    { name: 'Notes & Notifications', component: CustomerNotesAndNotifications, icon: PencilSquareIcon },
    { name: 'Custom Fields', component: CustomerCustomFields, icon: AdjustmentsHorizontalIcon },
    { name: 'Address', component: CustomerAddress, icon: MapPinIcon },
    { name: 'Credit Cards', component: CustomerCreditCards, icon: CreditCardIcon },
    { name: 'Purchase History', component: CustomerPurchaseHistory, icon: ShoppingCartIcon },
    
    
    
  ];

  const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);

  const activeTab = tabs.find((tab) => tab.name === currentTab);
  const ActiveComponent = activeTab?.component;

  return (
    <div className="mx-10 my-5">
      {/* Mobile dropdown */}
      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={currentTab}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentTab(e.target.value)}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>

      {/* Desktop tabs */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setCurrentTab(tab.name)}
                aria-current={currentTab === tab.name ? 'page' : undefined}
                className={classNames(
                  currentTab === tab.name
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                )}
              >
                <tab.icon
                  aria-hidden="true"
                  className={classNames(
                    currentTab === tab.name
                      ? 'text-indigo-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-2 -ml-0.5 size-5',
                  )}
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Active component */}
      <div className="mt-6">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default CustomerTabDetailsSection;