import { Colors } from '@src/constants/colors';
import {
  TransactionItem,
  TransactionResponse,
} from '@src/features/transaction';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('TransactionItem', () => {
  const onPressMock = jest.fn();

  const itemSuccessMock: TransactionResponse = {
    id: '1',
    amount: 1000,
    uniqueCode: 123456,
    status: 'SUCCESS',
    senderBank: 'Bank A',
    accountNumber: '1234567890',
    beneficiaryName: 'John Doe',
    beneficiaryBank: 'Bank B',
    remark: 'Test remark',
    createdAt: '2023-01-01T00:00:00Z',
  };

  const itemPendingMock: TransactionResponse = {
    id: '2',
    amount: 500,
    uniqueCode: 654321,
    status: 'PENDING',
    senderBank: 'Bank C',
    accountNumber: '0987654321',
    beneficiaryName: 'Jane Doe',
    beneficiaryBank: 'Bank D',
    remark: 'Pending remark',
    createdAt: '2023-01-02T00:00:00Z',
  };

  it('renders correctly (SUCCESS)', () => {
    render(<TransactionItem item={itemSuccessMock} onTap={onPressMock} />);

    const element = screen.getByTestId('badge');
    expect(element).toBeTruthy();
    expect(element).toHaveStyle({ backgroundColor: Colors.success });
  });

  it('renders correctly (PENDING)', () => {
    render(<TransactionItem item={itemPendingMock} onTap={onPressMock} />);

    const element = screen.getByTestId('badge');
    expect(element).toBeTruthy();
    expect(element).toHaveStyle({ borderColor: Colors.secondaryColor });
  });

  it('should call onTap when pressing the transaction item', () => {
    render(<TransactionItem item={itemSuccessMock} onTap={onPressMock} />);

    fireEvent.press(screen.getByTestId('transaction-item'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
