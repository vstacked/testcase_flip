import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@src/navigation/RootStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react-native';
import * as useFetchTransactionListHook from '@src/features/transaction/hooks/useFetchTransactionList';

describe('RootStack', () => {
  let queryClient: QueryClient;

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

  it('should render TransactionListScreen as initial route', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue({
        data: [],
        isPending: false,
        isFetching: false,
        isPlaceholderData: false,
        error: null,
        isSuccess: true,
      } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });
  });

  it('should have headerShown set to false', async () => {
    jest
      .spyOn(useFetchTransactionListHook, 'useFetchTransactionList')
      .mockReturnValue({
        data: [],
        isPending: false,
        isFetching: false,
        isPlaceholderData: false,
        error: null,
        isSuccess: true,
      } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('transaction-list')).toBeOnTheScreen();
    });

    // Header should not be visible
    expect(screen.queryByText('TransactionList')).toBeNull();
  });
});
