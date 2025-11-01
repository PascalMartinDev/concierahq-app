export class CommerceSeven {
  protected _flags: string[] = [];
  protected _groups: string[] = [];
  protected _clubs: string[] = [];
  protected _notifications: string[] = [];
  protected _emailMarketingStatus: string = '';

  // Getters:
  get flags(): string[] {
    return this._flags;
  }

  get groups(): string[] {
    return this._groups;
  }

  get clubs(): string[] {
    return this._clubs;
  }
  get notifications(): string[] {
    return this._notifications;
  }
  get emailMarketingStatus(): string {
    return this._emailMarketingStatus;
  }

  // Setters:
  set flags(value: string[]) {
    this._flags = value;
  }

  set groups(value: string[]) {
    this._groups = value;
  }

  set clubs(value: string[]) {
    this._clubs = value;
  }
  set notifications(value: string[]) {
    this._notifications = value;
  }
  set emailMarketingStatus(value: string) {
    this._emailMarketingStatus = value;
  }
}
