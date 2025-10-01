export class Bookings {
  protected _bookingStatus: string = '';
  protected _bookingDateTime: string = '';
  protected _bookingNoPeople: string = '';
  protected _bookingNotes: string = '';
  protected _bookingServiceName: string = '';
  protected _bookingTableNameNumber: string = '';
  protected _bookingTableSection: string = '';
  protected _bookingDuration: string = '';
  protected _bookingTagList: string[] = [];
  protected _bookingIsVip: boolean = false;

  // Getters:
  get bookingStatus(): string {
    return this._bookingStatus;
  }

  get bookingDateTime(): string {
    return this._bookingDateTime;
  }

  get bookingNoPeople(): string {
    return this._bookingNoPeople;
  }

  get bookingNotes(): string {
    return this._bookingNotes;
  }

  get bookingServiceName(): string {
    return this._bookingServiceName;
  }

  get bookingTableNameNumber(): string {
    return this._bookingTableNameNumber;
  }

  get bookingTableSection(): string {
    return this._bookingTableSection;
  }

  get bookingDuration(): string {
    return this._bookingDuration;
  }

  // Setters:
  set bookingStatus(value: string) {
    this._bookingStatus = value;
  }

  set bookingDateTime(value: string) {
    this._bookingDateTime = value;
  }

  set bookingNoPeople(value: string) {
    this._bookingNoPeople = value;
  }

  set bookingNotes(value: string) {
    this._bookingNotes = value;
  }
  set bookingServiceName(value: string) { 
    this._bookingServiceName = value;
  }
  
  set bookingTableNameNumber(value: string) {
    this._bookingTableNameNumber = value;
  }
  
  set bookingTableSection(value: string) {  
    this._bookingTableSection = value;
  }
  
  set bookingDuration(value: string) {
    this._bookingDuration = value;
  }
  
  set bookingTagList(value: string[]) { 
    this._bookingTagList = value;
  }
  
  set bookingIsVip(value: boolean) {
    this._bookingIsVip = value;
  } 
}
