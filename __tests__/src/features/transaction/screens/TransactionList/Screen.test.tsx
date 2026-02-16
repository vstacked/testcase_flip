import { NavigationContainer } from '@react-navigation/native';
import {
  DetailScreen,
  TransactionListScreen,
  TransactionResponse,
} from '@src/features/transaction';
import * as useFetchTransactionListHook from '@src/features/transaction/hooks/useFetchTransactionList';
import { Stack } from '@src/navigation/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { RefreshControl } from 'react-native';

describe('Transaction/TransactionList', () => {
  const responseMock: TransactionResponse[] = [
    {
      id: 'ID1',
      amount: 100000,
      uniqueCode: 123,
      status: 'SUCCESS',
      senderBank: 'bca',
      accountNumber: '1234567890',
      beneficiaryName: 'John Doe',
      beneficiaryBank: 'bri',
      remark: 'Payment for invoice #1',
      createdAt: '2024-06-01T10:00:00Z',
    },
    {
      id: 'ID2',
      amount: 250000,
      uniqueCode: 456,
      status: 'PENDING',
      senderBank: 'mandiri',
      accountNumber: '0987654321',
      beneficiaryName: 'Jane Smith',
      beneficiaryBank: 'bni',
      remark: 'Payment for invoice #2',
      createdAt: '2024-06-02T11:00:00Z',
    },
  ];

  let queryClient: QueryClient;

  const mockHookReturn = (overrides = {}) => ({
    data: responseMock,
    isPending: false,
    isFetching: false,
    isPlaceholderData: false,
    error: null,
    isSuccess: true,
    ...overrides,
  });

  const renderScreen = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="TransactionList"
              component={TransactionListScreen}
            />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    queryClient.clear();
  });

  it('should render correctly and display the transaction list', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue(mockHookReturn() as any);

    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });

    expect(screen.getByText('JOHN DOE')).toBeOnTheScreen();
    expect(screen.getByText('JANE SMITH')).toBeOnTheScreen();
  });

  it('should navigate to Detail when a transaction item is pressed', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue(mockHookReturn() as any);

    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });

    fireEvent.press(screen.getByText('JOHN DOE'));

    await waitFor(() => {
      expect(screen.getByText('Tutup')).toBeOnTheScreen();
    });
  });

  it('should show loading indicator when isPending is true', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue(
        mockHookReturn({ isPending: true, data: undefined }) as any,
      );

    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });

    expect(screen.getByTestId('pending-indicator')).toBeTruthy();
  });

  it('should show error message when there is an error', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue(
        mockHookReturn({
          error: { message: 'Network error' },
          data: undefined,
        }) as any,
      );

    renderScreen();

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeOnTheScreen();
    });
  });

  it('should open filter modal when tapping sort button', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue(mockHookReturn() as any);

    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });

    fireEvent.press(screen.getByText('URUTKAN'));

    await waitFor(() => {
      expect(screen.getByText('Nama A-Z')).toBeOnTheScreen();
    });
  });

  it('should close filter modal and update option when selecting a filter', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue(mockHookReturn() as any);

    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });

    fireEvent.press(screen.getByText('URUTKAN'));

    await waitFor(() => {
      expect(screen.getByText('Nama A-Z')).toBeOnTheScreen();
    });

    fireEvent.press(screen.getByText('Nama A-Z'));

    await waitFor(() => {
      expect(screen.getByText('Nama A-Z')).toBeOnTheScreen();
      expect(screen.queryByText('Nama Z-A')).toBeNull();
    });
  });

  it('should refresh the list when pulling to refresh', async () => {
    const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue(mockHookReturn() as any);

    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });

    const refreshControl = screen.UNSAFE_getByType(RefreshControl);

    fireEvent(refreshControl, 'onRefresh');

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: ['transactionList'],
    });
  });

  it('should show fetching indicator when isFetching is true', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue(mockHookReturn({ isFetching: true }) as any);

    renderScreen();

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });

    const indicators = screen.getAllByTestId('fetching-indicator');

    expect(indicators.length).toBeGreaterThan(0);
  });
});
