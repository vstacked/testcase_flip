import { filterOptions } from '@src/constants/filterOptions';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { transactionService } from '..';

const queryKeyTransactionList = 'transactionList';

function useFetchTransactionList({
  skip,
  option,
}: {
  skip: number;
  option?: (typeof filterOptions)[number];
}) {
  return useQuery({
    queryKey: [queryKeyTransactionList, skip],
    queryFn: async () =>
      await transactionService.getTransactionList({ skip, option }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
}

export { useFetchTransactionList, queryKeyTransactionList };
