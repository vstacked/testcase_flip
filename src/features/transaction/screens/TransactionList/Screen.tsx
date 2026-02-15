import React, { useCallback, useState } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import useGetKeyboardOffset from '@src/shared/hook/useGetKeyboardOffset';
import { filterOptions } from '@src/constants/filterOptions';
import { ModalFilter } from '../../components/ModalFilter';
import { TransactionListScreenProps } from '@src/navigation/types';
import { SearchBar } from '../../components/SearchBar';
import { TransactionItem } from '../../components/TransactionItem';
import { Container } from '@src/shared/components/Container';

export const TransactionListScreen = ({
  navigation,
}: TransactionListScreenProps) => {
  const { offset } = useGetKeyboardOffset();

  const [showModal, setShowModal] = useState(false);

  const [option, setOption] =
    useState<(typeof filterOptions)[number]>('URUTKAN');

  const renderItem = useCallback<ListRenderItem<number>>(
    ({ item }) => {
      const success = item % 2 === 0;
      return (
        <TransactionItem
          onTap={() => {
            navigation.navigate('Detail');
          }}
          success={success}
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

        <FlatList<number>
          testID="transaction-list"
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          ListFooterComponent={<View style={{ marginBottom: offset || 16 }} />}
          //   refreshControl={}
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
