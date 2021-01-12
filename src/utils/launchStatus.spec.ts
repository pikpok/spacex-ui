import { Launch } from "../types";
import { launchStatus } from "./launchStatus"

it('should return correct launch status', () => {
  expect(launchStatus({ upcoming: false, success: true } as Launch)).toBe('Success');
  expect(launchStatus({ upcoming: false, success: false } as Launch)).toBe('Failure');
  expect(launchStatus({ upcoming: true, success: true } as Launch)).toBe('Future');
  expect(launchStatus({ upcoming: true, success: false } as Launch)).toBe('Future');
});
