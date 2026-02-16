import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import useGetKeyboardOffset from '@src/shared/hook/useGetKeyboardOffset';
import { filterOptions } from '@src/constants/filterOptions';
import { TransactionListScreenProps } from '@src/navigation/types';
import { Container } from '@src/shared/components/Container';
import { useQueryClient } from '@tanstack/react-query';
import {
  ModalFilter,
  queryKeyTransactionList,
  SearchBar,
  TransactionItem,
  TransactionResponse,
  useFetchTransactionList,
  useLocalFunction,
} from '../..';

export const TransactionListScreen = ({
  navigation,
}: TransactionListScreenProps) => {
  const queryClient = useQueryClient();

  const { offset } = useGetKeyboardOffset();

  const [showModal, setShowModal] = useState(false);

  const [keyword, setKeyword] = useState<string>('');

  const [option, setOption] =
    useState<(typeof filterOptions)[number]>('URUTKAN');

  const [transactionData, setTransactionData] = useState<TransactionResponse[]>(
    [],
  );

  const { isPending, error, data, isFetching } = useFetchTransactionList();

  const { searchItems, filterItems } = useLocalFunction();

  const memoizedData = useMemo(() => {
    let result = transactionData;

    if (option !== 'URUTKAN') {
      result = filterItems(option, result);
    }

    if (keyword.length > 0) {
      result = searchItems(keyword, result);
    }

    return result;
  }, [transactionData, keyword, option, searchItems, filterItems]);

  useEffect(() => {
    if (data) {
      setTransactionData(prev => Array.from(new Set([...prev, ...data])));
    }
  }, [data]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeyTransactionList] });
    setTransactionData([]);
  };

  const renderItem = useCallback<ListRenderItem<TransactionResponse>>(
    ({ item }) => {
      return (
        <TransactionItem
          item={item}
          onTap={() => {
            navigation.navigate('Detail', { item });
          }}
        />
      );
    },
    [navigation],
  );

  return (
    <>
      <Container>
        <SearchBar
          onTapOptions={() => setShowModal(true)}
          option={option}
          onValueChange={setKeyword}
        />

        <FlatList<TransactionResponse>
          testID="transaction-list"
          data={memoizedData}
          ListHeaderComponent={
            <>{isPending && <ActivityIndicator testID="pending-indicator" />}</>
          }
          ListFooterComponent={
            <View>
              {isFetching && <ActivityIndicator testID="fetching-indicator" />}
              {error && <Text>{error.message}</Text>}
              <View style={{ marginBottom: offset || 16 }} />
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
          }
          renderItem={renderItem}
        />
      </Container>

      <ModalFilter
        showModal={showModal}
        value={option}
        onClose={() => {
          setShowModal(false);
        }}
        onSelect={setOption}
      />
    </>
  );
};
