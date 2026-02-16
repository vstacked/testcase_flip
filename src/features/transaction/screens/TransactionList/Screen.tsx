import React, { useCallback, useEffect, useState } from 'react';
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
} from '../..';

export const TransactionListScreen = ({
  navigation,
}: TransactionListScreenProps) => {
  const queryClient = useQueryClient();

  const { offset } = useGetKeyboardOffset();

  const [showModal, setShowModal] = useState(false);

  const [skip, setSkip] = useState(0);

  const [option, setOption] =
    useState<(typeof filterOptions)[number]>('URUTKAN');

  const [transactionData, setTransactionData] = useState<TransactionResponse[]>(
    [],
  );

  const { isPending, error, data, isFetching, isPlaceholderData } =
    useFetchTransactionList({ skip, option });

  // useEffect(() => {
  //   if (!isPlaceholderData && data && data?.skip < data?.total) {
  //     queryClient.prefetchQuery({
  //       queryKey: ['transactionList', skip + 10],
  //       queryFn: () =>
  //         transactionService.getTransactionList({ skip: skip + 10 }),
  //     });
  //   }
  // }, [data, isPlaceholderData, skip, queryClient]);

  useEffect(() => {
    if (data) {
      setTransactionData(prev => Array.from(new Set([...prev, ...data])));
    }
  }, [data]);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeyTransactionList] });
    setSkip(0);
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
          onValueChange={value => {
            console.log(value);
          }}
        />

        <FlatList<TransactionResponse>
          testID="transaction-list"
          data={transactionData}
          onEndReached={() => {
            // if (data && data.skip < data.total) setSkip(prev => prev + 10);
          }}
          ListHeaderComponent={
            <>
              {skip === 0 && isPending && (
                <ActivityIndicator testID="pending-indicator" />
              )}
            </>
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
        onSelect={val => {
          setOption(val);
          handleRefresh();
        }}
      />
    </>
  );
};
