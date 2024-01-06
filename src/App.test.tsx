import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './components/header';
import { EventView } from './utils/helpers';
import App from './App';

test('View switcher', async () => {
  render(<Header />);

  expect(screen.getByText(EventView.LIST)).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('dropdownOpen'));

  expect(screen.getByText(EventView.CALENDER)).toBeInTheDocument();
});

test('Modal', async () => {
  render(<App />);

  expect(screen.getByText('+')).toBeInTheDocument();
  fireEvent.click(screen.getByText('+'));

  expect(screen.getByText('Add Event')).toBeInTheDocument();
});
