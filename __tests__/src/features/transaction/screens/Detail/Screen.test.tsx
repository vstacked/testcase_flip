import { NavigationContainer } from '@react-navigation/native';
import { DetailScreen } from '@src/features/transaction';
import { Stack } from '@src/navigation/types';
import { fireEvent, render, screen } from '@testing-library/react-native';

jest.useFakeTimers();

describe('Transaction/Detail', () => {
  it('should render correctly', () => {
    render(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    expect(screen.getByText('Tutup')).toBeOnTheScreen();
  });

  it('should tap copy to clipboard', async () => {
    render(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const copyButton = screen.getByTestId('clipboard-button');
    fireEvent.press(copyButton);
  });
});
