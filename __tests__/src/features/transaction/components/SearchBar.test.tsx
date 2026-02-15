import { SearchBar } from '@src/features/transaction/components/SearchBar';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('SearchBar', () => {
  const onPressMock = jest.fn();

  const toSelect = 'John Doe';

  it('renders correctly with option selected (URUTKAN)', () => {
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

  it('should call onValueChange when typing in the search input', () => {
    render(
      <SearchBar
        option="URUTKAN"
        onTapOptions={onPressMock}
        onValueChange={onPressMock}
      />,
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Cari nama, bank, atau nominal'),
      toSelect,
    );
    expect(onPressMock).toHaveBeenCalled();
  });
});
