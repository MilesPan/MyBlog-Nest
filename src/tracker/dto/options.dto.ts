export interface Tracker {
  uuid?: string;
  requestUrl?: string;
  historyTracker: boolean;
  hashTracker: boolean;
  domTracker: boolean;
  sdkVersion: string | number;
  extra?: Record<string, any>;
  jsError: boolean;
  event?: number;
  targetKey?: any;
}
