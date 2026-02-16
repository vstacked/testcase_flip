import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { TransactionResponse } from '@src/features/transaction';

type RootStackParamList = {
  TransactionList: undefined;
  Detail: {
    item: TransactionResponse;
  };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

export type TransactionListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TransactionList'
>;

export type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;
