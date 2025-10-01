import BusinessCustomer from "./BusinessCustomer";
import type { Bookings } from "./modules/Bookings";
import type { Crm } from "./modules/Crm";
import type { CustomerFields } from "./modules/CustomFields";
import type { ECommerce } from "./modules/ECommerce";

interface IAppCustomer {
  group: string
  eCommerce?: ECommerce
  crm?: Crm
  bookings?: Bookings
  customFields?: CustomerFields
}

export class AppCustomer extends BusinessCustomer implements IAppCustomer{
  protected _group: string = '';
  protected _eCommerce: ECommerce | undefined = undefined;
  protected _crm: Crm | undefined = undefined;
  protected _bookings: Bookings | undefined = undefined;
  protected _customFields: CustomerFields | undefined = undefined;


  // Getter:
  get group(): string {
    return this._group;
  }

  get eCommerce(): ECommerce | undefined {
    return this._eCommerce;
  }

  get crm(): Crm | undefined {
    return this._crm;
  }

  get bookings(): Bookings | undefined {
    return this._bookings;
  }

  get customFields(): CustomerFields | undefined {
    return this._customFields;
  }

  // Setter:
  set group(value: string) {
    this._group = value;
  }
  set eCommerce(value: ECommerce | undefined) {
    this._eCommerce = value;
  }
  set crm(value: Crm | undefined) {
    this._crm = value;
  }
  set bookings(value: Bookings | undefined) {
    this._bookings = value;
  }
  set customFields(value: CustomerFields | undefined) {
    this._customFields = value;
  }
}


