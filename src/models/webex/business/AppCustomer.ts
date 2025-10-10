import BusinessCustomer from "./BusinessCustomer";
import { Bookings } from "./modules/Bookings";
import { CommerceSeven } from "./modules/CommerceSeven";
import { Crm } from "./modules/Crm";
import { CustomFields } from "./modules/CustomFields";
import { ECommerce } from "./modules/ECommerce";

interface IAppCustomer {
  group: string
  eCommerce: ECommerce;
  crm: Crm;
  bookings: Bookings;
  customFields: CustomFields;
  commerceSeven: CommerceSeven
}

export class AppCustomer extends BusinessCustomer implements IAppCustomer{
  protected _group: string = '';
  protected _eCommerce: ECommerce;
  protected _customFields: CustomFields;
  protected _crm: Crm;
  protected _bookings: Bookings;
  protected _commerceSeven: CommerceSeven;

  constructor() {
    super();
    this._eCommerce = new ECommerce();
    this._customFields = new CustomFields();
    this._crm = new Crm();
    this._bookings = new Bookings();
    this._commerceSeven = new CommerceSeven();
  }
  
  // Getter:
  get group(): string {
    return this._group;
  }
  get eCommerce(): ECommerce {
    return this._eCommerce;
  }
  get commerceSeven(): CommerceSeven {
    return this._commerceSeven;
  }
  get crm(): Crm {
    return this._crm;
  }
  get bookings(): Bookings {
    return this._bookings;
  }
  get customFields(): CustomFields {
    return this._customFields;
  }

  // Setter:
  set group(value: string) {
    this._group = value;
  }
  set eCommerce(value: ECommerce) {
    this._eCommerce = value;
  }
  set commerceSeven(value: CommerceSeven) {
    this._commerceSeven = value;
  }
  set crm(value: Crm) {
    this._crm = value;
  }
  set bookings(value: Bookings) {
    this._bookings = value;
  }
  set customFields(value: CustomFields) {
    this._customFields = value;
  }
}


