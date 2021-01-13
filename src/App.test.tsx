import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { App } from './App';

const waitForLoad = () => waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

beforeEach(() => {
  render(<App />);
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('hides the spinner and display items after loading', async () => {
  const spinner = screen.getByText('Loading...');

  expect(spinner).toBeInTheDocument();

  await waitForLoad();

  expect(spinner).not.toBeInTheDocument();

  const items = screen.getAllByRole('listitem');
  expect(items.length).toBe(2);
  expect(items[0]).toHaveTextContent('Launch 1');
  expect(items[1]).toHaveTextContent('Launch 2');
});

test('does not allow to open previous page from the first page', async () => {
  await waitForLoad();

  const button = screen.getByText(/previous/i);

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('disabled');

  fireEvent.click(button);

  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

test('does not allow to open next page from the last page', async () => {
  await waitForLoad();

  for (let i = 0; i < 2; i++) {
    fireEvent.click(screen.getByText(/next/i));
    await waitForLoad();
  }

  const button = screen.getByText(/next/i);
  fireEvent.click(button);

  expect(button).toHaveAttribute('disabled');
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

test('opens next page', async () => {
  await waitForLoad();

  fireEvent.click(screen.getByText(/next/i));
  await waitForLoad();

  expect(screen.getByText(/launches/i)).toHaveTextContent(/page 2/i);

  const items = await screen.findAllByRole('listitem');
  expect(items[0]).toHaveTextContent('Launch 3');
  expect(items[1]).toHaveTextContent('Launch 4');
});

test('opens previous page', async () => {
  await waitForLoad();
  fireEvent.click(screen.getByText(/next/i));
  await waitForLoad();

  fireEvent.click(screen.getByText(/previous/i));

  await waitForLoad();

  expect(screen.getByText(/launches/i)).toHaveTextContent(/page 1/i);

  const items = await screen.findAllByRole('listitem');
  expect(items[0]).toHaveTextContent('Launch 1');
  expect(items[1]).toHaveTextContent('Launch 2');
});

it('should apply filtering', async () => {
  await waitForLoad();

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Query' } });
  act(() => { jest.runAllTimers(); });
  await waitForLoad();

  expect(screen.getAllByRole('listitem').length).toBe(1);
  expect(screen.getByRole('listitem')).toHaveTextContent('Query');

  fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
  act(() => { jest.runAllTimers(); });
  await waitForLoad();

  expect(screen.getAllByRole('listitem').length).toBe(2);
});

it('should filter by launch status', async () => {
  await waitForLoad();

  for (const value of ['Future', 'Success', 'Failure']) {
    fireEvent.change(screen.getByRole('combobox'), { target: { value } });
    await waitForLoad();

    expect(screen.getAllByRole('listitem').length).toBe(1);
    expect(screen.getByRole('listitem')).toHaveTextContent(value);
  }
});

it('should reset pagination after filter change', async () => {
  await waitForLoad();

  fireEvent.click(screen.getByText(/next/i));
  await waitForLoad();

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Query' } });
  act(() => { jest.runAllTimers(); });
  await waitForLoad();

  expect(screen.getByText(/launches/i)).toHaveTextContent(/page 1/i);
});

it('should debounce query change', async () => {
  await waitForLoad();

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Query' } });

  expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Query');
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

  act(() => { jest.advanceTimersByTime(200); });
  expect(screen.queryByText('Loading...')).toBeInTheDocument();
});
