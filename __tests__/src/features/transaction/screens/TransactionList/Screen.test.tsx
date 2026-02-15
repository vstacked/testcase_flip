import { NavigationContainer } from '@react-navigation/native';
import { TransactionListScreen } from '@src/features/transaction';
import { Stack } from '@src/navigation/types';
import { render, screen } from '@testing-library/react-native';

jest.useFakeTimers();

describe('Transaction/TransactionList', () => {
  it('should render correctly', () => {
    render(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="TransactionList"
            component={TransactionListScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
  });
});
