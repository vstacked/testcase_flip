import { SearchBar } from '@src/features/transaction';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

describe('SearchBar', () => {
  const onPressMock = jest.fn();

  const toInput = 'John Doe';

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('renders correctly with option selected: URUTKAN', () => {
    render(
      <SearchBar
        option="URUTKAN"
        onTapOptions={onPressMock}
        onValueChange={onPressMock}
      />,
    );

    expect(
      screen.getByPlaceholderText('Cari nama, bank, atau nominal'),
    ).toBeTruthy();
    expect(screen.getByText('URUTKAN')).toBeTruthy();
  });

  it('should call onTapOptions when pressing the sort button', () => {
    render(
      <SearchBar
        option="URUTKAN"
        onTapOptions={onPressMock}
        onValueChange={onPressMock}
      />,
    );

    fireEvent.press(screen.getByText('URUTKAN'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should call onValueChange when typing in the search input', async () => {
    render(
      <SearchBar
        option="URUTKAN"
        onTapOptions={onPressMock}
        onValueChange={onPressMock}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Cari nama, bank, atau nominal'),
      toInput,
    );
    jest.advanceTimersByTime(300);
    await waitFor(() => {
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should be able to press the search icon', async () => {
    render(
      <SearchBar
        option="URUTKAN"
        onTapOptions={onPressMock}
        onValueChange={onPressMock}
      />,
    );

    const searchIcon = screen.getByTestId('icon-search-input');
    expect(searchIcon).toBeTruthy();
    fireEvent.press(searchIcon);
  });
});
