declare module "country-state-city" {
  export interface ICountry {
    name: string;
    isoCode: string;
    phonecode: string;
    flag: string;
    currency: string;
    latitude: string;
    longitude: string;
  }

  export interface IState {
    name: string;
    isoCode: string;
    countryCode: string;
    latitude: string | null;
    longitude: string | null;
  }

  export interface ICity {
    name: string;
    countryCode: string;
    stateCode: string;
    latitude: string | null;
    longitude: string | null;
  }

  export class Country {
    static getAllCountries(): ICountry[];
    static getCountryByCode(isoCode: string): ICountry | undefined;
  }

  export class State {
    static getStatesOfCountry(countryCode: string): IState[];
    static getStateByCodeAndCountry(
      stateCode: string,
      countryCode: string
    ): IState | undefined;
  }

  export class City {
    static getCitiesOfState(countryCode: string, stateCode: string): ICity[];
    static getCitiesOfCountry(countryCode: string): ICity[];
  }
}
