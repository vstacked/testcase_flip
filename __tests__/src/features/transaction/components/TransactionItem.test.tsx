import { Colors } from '@src/constants/colors';
import { TransactionItem } from '@src/features/transaction/components/TransactionItem';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('TransactionItem', () => {
  const onPressMock = jest.fn();

  it('renders correctly with green badge', () => {
    render(<TransactionItem success onTap={onPressMock} />);

    const element = screen.getByTestId('badge');
    expect(element).toBeTruthy();
    expect(element).toHaveStyle({ backgroundColor: Colors.success });
  });

  it('should call onTap when pressing the transaction item', () => {
    render(<TransactionItem success onTap={onPressMock} />);

    fireEvent.press(screen.getByTestId('transaction-item'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
