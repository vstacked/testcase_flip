import { useQuery } from '@tanstack/react-query';
import { transactionService } from '..';

const queryKeyTransactionList = 'transactionList';

function useFetchTransactionList() {
  return useQuery({
    queryKey: [queryKeyTransactionList],
    queryFn: async () => await transactionService.getTransactionList(),
  });
}

export { useFetchTransactionList, queryKeyTransactionList };
