import type { AppCustomer } from '../../models/webex/business/AppCustomer';
import { BaseCustomerMapper } from './BaseCustomerMapper';

export class BookingMapper extends BaseCustomerMapper {
  public override map(): AppCustomer {
    const mapped = super.map();
    this.mapBooking();
    return mapped;
  }

  private mapBooking(): void {
    const { booking } = this.customerProfile;
    if (!booking) return;

    const target = this.appCustomer.bookings;
    // Core Booking Parameters
    if (booking.booking_status) target.bookingStatus = booking.booking_status;
    if (booking.booking_date_time)
      target.bookingDateTime = booking.booking_date_time;
    if (booking.booking_no_people)
      target.bookingNoPeople = booking.booking_no_people;
    if (booking.booking_notes) target.bookingNotes = booking.booking_notes;
    if (booking.booking_table_name_number)
      target.bookingTableNameNumber = booking.booking_table_name_number;
    if (booking.booking_table_section)
      target.bookingTableSection = booking.booking_table_section;
    if (booking.booking_tags_list)
      target.bookingTagList = booking.booking_tags_list;

    // Additional Booking Platform Parameters
    const bookingIntegration = import.meta.env.VITE_INTEGRATION_BOOKING;
    if (
      bookingIntegration === 'OpenTable' ||
      bookingIntegration === 'NowBookIt'
    ) {
      if (booking.booking_service_name)
        target.bookingServiceName = booking.booking_service_name;
    }

    if (bookingIntegration === 'SevenRooms') {
      if (booking.booking_is_vip) target.bookingIsVip = booking.booking_is_vip;
    }

    if (
      bookingIntegration === 'SevenRooms' ||
      bookingIntegration === 'NowBookIt'
    ) {
      if (booking.booking_duration)
        target.bookingDuration = booking.booking_duration;
    }
  }
}
