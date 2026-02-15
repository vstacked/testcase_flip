import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  TransactionList: undefined;
  Detail: undefined;
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
