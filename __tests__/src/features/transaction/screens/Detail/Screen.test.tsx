import Clipboard from '@react-native-clipboard/clipboard';
import { NavigationContainer } from '@react-navigation/native';
import { DetailScreen } from '@src/features/transaction';
import { TransactionResponse } from '@src/features/transaction';
import { Stack } from '@src/navigation/types';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('Transaction/Detail', () => {
  const itemMock: TransactionResponse = {
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

  it('should render correctly', () => {
    render(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            initialParams={{ item: itemMock }}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    expect(screen.getByText('Tutup')).toBeOnTheScreen();
  });

  it('should tap copy to clipboard', async () => {
    render(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            initialParams={{ item: itemMock }}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const copyButton = screen.getByTestId('clipboard-button');
    fireEvent.press(copyButton);
    expect(Clipboard.setString).toHaveBeenCalledWith(`#${itemMock.id}`);
  });
});
