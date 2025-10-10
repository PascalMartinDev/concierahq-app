export class Bookings {
  protected _bookingStatus: string = '';
  protected _bookingDateTime: string = '';
  protected _bookingNoPeople: number = 0;
  protected _bookingNotes: string = '';
  protected _bookingServiceName: string = '';
  protected _bookingTableNameNumber: string = '';
  protected _bookingTableSection: string = '';
  protected _bookingDuration: number = 0;
  protected _bookingTagList: string[] = [];
  protected _bookingIsVip: string = "false";

  // Getters:
  get bookingStatus(): string {
    return this._bookingStatus;
  }

  get bookingDateTime(): string {
    return this._bookingDateTime;
  }

  get bookingNoPeople(): number {
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

  get bookingDuration(): number {
    return this._bookingDuration;
  }

  get bookingTagList(): string[] {
    return this._bookingTagList;
  }

  get bookingIsVip(): string {
    return this._bookingIsVip;
  }

  // Setters:
  set bookingStatus(value: string) {
    this._bookingStatus = value;
  }

  set bookingDateTime(value: string) {
    this._bookingDateTime = value;
  }

  set bookingNoPeople(value: number) {
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
  
  set bookingDuration(value: number) {
    this._bookingDuration = value;
  }
  
  set bookingTagList(value: string[]) { 
    this._bookingTagList = value;
  }
  
  set bookingIsVip(value: string) {
    this._bookingIsVip = value;
  } 
}
