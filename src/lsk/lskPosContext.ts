/*

export interface IPosContext {
  businessId: number | string;
  businessName: string;
  locationId: number | string;
  deviceName: string;
  deviceId: number | string;
  userName: string;
  userId: number | string;
}

// Declare global posContext injected by LSK POS webextension
declare const posContext: IPosContext;

interface IPosContextData extends IPosContext {
  isInitialised: boolean;
}

export class LskPosContext {
  private static _instance: LskPosContext;

  public businessId: number | string | null = null;
  public businessName: string | null = null;
  public locationId: number | string | null = null;
  public deviceName: string | null = null;
  public deviceId: number | string | null = null;
  public userName: string | null = null;
  public userId: number | string | null = null;
  public isInitialised: boolean = false;

  private constructor() {
    // Private constructor for Singleton Pattern
  }

  public static getInstance(): LskPosContext {
    if (!LskPosContext._instance) {
      LskPosContext._instance = new LskPosContext();
    }
    return LskPosContext._instance;
  }

  public initialise(posContext: IPosContext): void {
    if (!posContext) {
      console.warn('LskPosContect: No posContext provided by LSK Pos');
      return;
    }

    this.businessId = posContext.businessId;
    this.businessName = posContext.businessName;
    this.locationId = posContext.locationId;
    this.deviceName = posContext.deviceName;
    this.deviceId = posContext.deviceId;
    this.userName = posContext.userName;
    this.userId = posContext.userId;
    this.isInitialised = true;
  }

  public toJSON(): IPosContextData {
    return {
      businessId: this.businessId!,
      businessName: this.businessName!,
      locationId: this.locationId!,
      deviceName: this.deviceName!,
      deviceId: this.deviceId!,
      userName: this.userName!,
      userId: this.userId!,
      isInitialised: this.isInitialised,
    };
  }

  public reset(): void {
    this.businessId = null;
    this.businessName = null;
    this.locationId = null;
    this.deviceName = null;
    this.deviceId = null;
    this.userName = null;
    this.userId = null;
    this.isInitialised = false;
  }
}

// Export singleton instance
export const lskPosContext = LskPosContext.getInstance();


// Test Class:
// Test: Alert to verify posContext is captured
if (typeof posContext !== 'undefined') {
  alert('posContext found!');
  lskPosContext.initialise(posContext);

  const data = lskPosContext.toJSON();
  alert(
    `Business: ${data.businessName}\nLocation: ${data.locationId}\nDevice: ${data.deviceName}\nUser: ${data.userName}`
  );
} else {
  alert('posContext not found - not injected yet');
}

*/
