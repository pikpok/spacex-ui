import { Launch } from "../types";

export type LaunchStatus = 'Future' | 'Success' | 'Failure';

export const launchStatus = (launch: Launch): LaunchStatus => {
  if (launch.date_unix > Math.floor(Date.now() / 1000)) {
    return 'Future';
  }

  if (launch.success) return 'Success';

  return 'Failure';
}
