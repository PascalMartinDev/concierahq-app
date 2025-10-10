import React from 'react';
import { useAppCustomer } from '../../../workflow/hooks/useAppCustomer';
import TagList from '../../ui/TagList';

const CustomerBookings: React.FC = () => {
  const appCustomer = useAppCustomer();

  // Booking Variable:
  const bookingDateTime = appCustomer?.bookings.bookingDateTime || '';
  const bookingDuration = appCustomer?.bookings.bookingDuration || '';
  const bookingIsVip = appCustomer?.bookings.bookingIsVip || '';
  const bookingNoPeopel = appCustomer?.bookings.bookingNoPeople || '';
  const bookingNotes = appCustomer?.bookings.bookingNotes || '';
  const bookingServiceName = appCustomer?.bookings.bookingServiceName || '';
  const bookingStatus = appCustomer?.bookings.bookingStatus || '';
  const bookingTableNameNumber = appCustomer?.bookings.bookingTableNameNumber || '';
  const bookingTableSection = appCustomer?.bookings.bookingTableSection || '';
  const bookingTagList = appCustomer?.bookings.bookingTagList || [];

  // Debug logging
  console.log('BookingTableNameNumber:', bookingTableNameNumber);
  console.log('Full appCustomer.bookings:', appCustomer?.bookings);

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="flex-1 space-y-2">
          <p className="text-gray-600">
            <b>Service:</b> {bookingServiceName}
          </p>
          <p className="text-gray-600">
            <b>Section:</b> {bookingTableSection}
          </p>
          <p className="text-gray-600">
            <b>Date:</b> {bookingDateTime}
          </p>
          <p className="text-gray-600"><b>Table:</b> {bookingTableNameNumber}</p>
          <p className="text-gray-600">
            <b>Duration:</b> {bookingDuration}
          </p>
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-gray-600"><b>Status:</b> {bookingStatus}</p>
          <p className="text-gray-600"><b>No. of People:</b> {bookingNoPeopel}</p>
          <p className="text-gray-600"><b>VIP:</b> {bookingIsVip}</p>
          <p className="text-gray-600"><b>Notes:</b> {bookingNotes}</p>
        </div>
        <div className="flex-1 space-y-2">
          <TagList tags={bookingTagList}/>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookings;
