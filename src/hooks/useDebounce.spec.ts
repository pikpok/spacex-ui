import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should set initial value correctly', () => {
    const { result } = renderHook(() => useDebounce('test', 200));

    expect(result.current).toBe('test');
  });

  it('should update value after given time', () => {
    let value = 'test';
    const { result, rerender } = renderHook(() => useDebounce(value, 200));

    value = 'test2';
    rerender();

    act(() => { jest.advanceTimersByTime(100); });
    expect(result.current).toBe('test');

    act(() => { jest.advanceTimersByTime(100); });
    expect(result.current).toBe('test2');
  });

  it('should set and clear interval after update', () => {
    let value = 'test';
    const { rerender } = renderHook(() => useDebounce(value, 200));

    value = 'test2';
    rerender();

    expect(jest.getTimerCount()).toBe(1);

    act(() => { jest.advanceTimersByTime(200); });

    expect(jest.getTimerCount()).toBe(0);
  });

  it('should not set timeout when rerendering with previous value', () => {
    let value = 'test';
    const { rerender } = renderHook(() => useDebounce(value, 230));

    act(() => { jest.advanceTimersByTime(250); });
    value = 'test';
    rerender();

    expect(jest.getTimerCount()).toBe(0);
  });
});
