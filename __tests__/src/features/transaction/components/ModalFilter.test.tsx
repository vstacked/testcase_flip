import { ModalFilter } from '@src/features/transaction/components/ModalFilter';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('ModalFilter', () => {
  const onPressMock = jest.fn();

  const toSelect = 'Nama A-Z';

  it('renders correctly with default value selected (URUTKAN)', () => {
    render(
      <ModalFilter
        showModal
        onClose={onPressMock}
        onSelect={onPressMock}
        value="URUTKAN"
      />,
    );

    expect(screen.getByTestId('option-selected')).toBeTruthy();
  });

  it('should call onClose when pressing outside the modal', () => {
    render(
      <ModalFilter
        showModal
        onClose={onPressMock}
        onSelect={onPressMock}
        value="URUTKAN"
      />,
    );

    fireEvent.press(screen.getByTestId('outside-modal-filter'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should call onSelect when pressing an option', () => {
    render(
      <ModalFilter
        showModal
        onClose={onPressMock}
        onSelect={onPressMock}
        value="URUTKAN"
      />,
    );

    fireEvent.press(screen.getByText(toSelect), toSelect);
    expect(onPressMock).toHaveBeenCalledWith(toSelect);
  });
});
