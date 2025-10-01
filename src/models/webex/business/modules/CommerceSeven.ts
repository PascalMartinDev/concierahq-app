export class CommerceSeven {
  protected _flags: string[] = [];
  protected _groups: string[] = [];
  protected _clubs: string[] = [];

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
}
