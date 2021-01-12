import { Launch } from "../types";

export type LaunchStatus = 'Future' | 'Success' | 'Failure';

export const launchStatus = (launch: Launch): LaunchStatus => {
  if (launch.upcoming) {
    return 'Future';
  }

  if (launch.success) return 'Success';

  return 'Failure';
}
