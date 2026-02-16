import {
  transactionService,
  useFetchTransactionList,
} from '@src/features/transaction';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import React, { PropsWithChildren } from 'react';

jest.mock('@src/features/transaction/api/transaction.service', () => ({
  transactionService: {
    getTransactionList: jest.fn(),
  },
}));

describe('useFetchTransactionList', () => {
  const mockData = [
    {
      id: 'ID1',
      amount: 100000,
      uniqueCode: 123,
      status: 'SUCCESS',
      senderBank: 'bca',
      accountNumber: '1234567890',
      beneficiaryName: 'John Doe',
      beneficiaryBank: 'bri',
      remark: 'Payment',
      createdAt: '2024-06-01T10:00:00Z',
    },
  ];

  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: PropsWithChildren) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  it('should fetch transaction list successfully', async () => {
    (transactionService.getTransactionList as jest.Mock).mockResolvedValue(
      mockData,
    );

    const { result } = renderHook(() => useFetchTransactionList(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(transactionService.getTransactionList).toHaveBeenCalledTimes(1);
  });

  it('should handle error when fetching fails', async () => {
    const error = new Error('Network error');
    (transactionService.getTransactionList as jest.Mock).mockRejectedValue(
      error,
    );

    const { result } = renderHook(() => useFetchTransactionList(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });

  it('should return isPending true while loading', async () => {
    (transactionService.getTransactionList as jest.Mock).mockResolvedValue(
      mockData,
    );

    const { result } = renderHook(() => useFetchTransactionList(), {
      wrapper,
    });

    expect(result.current.isPending).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
