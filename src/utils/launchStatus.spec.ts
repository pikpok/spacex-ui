import { Launch } from "../types";
import { launchStatus } from "./launchStatus"

describe('given that current date is 2021-01-01', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date('2021-01-01').getTime());
  });

  afterEach(() => {
    spy.mockRestore();
  });

  describe('given past launch date', () => {
    const date = Math.floor(new Date('2020-08-24').getTime() / 1000);

    it('should return correct launch status', () => {
      expect(launchStatus({ date_unix: date, success: true } as Launch)).toBe('Success');
      expect(launchStatus({ date_unix: date, success: false } as Launch)).toBe('Failure');
    });
  });

  describe('given future launch date', () => {
    const date = Math.floor(new Date('2021-08-24').getTime() / 1000);

    it('should return correct launch status', () => {
      expect(launchStatus({ date_unix: date, success: true } as Launch)).toBe('Future');
      expect(launchStatus({ date_unix: date, success: false } as Launch)).toBe('Future');
    });
  });
});
