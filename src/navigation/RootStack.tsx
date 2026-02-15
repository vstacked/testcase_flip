import { Stack } from './types';
import { DetailScreen, TransactionListScreen } from '@src/features/transaction';

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="TransactionList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TransactionList" component={TransactionListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
