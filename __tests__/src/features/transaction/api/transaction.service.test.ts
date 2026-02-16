import { apiClient } from '@src/api/client';
import { transactionService } from '@src/features/transaction';

jest.mock('@src/api/client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe('transactionService', () => {
  const mockApiResponse = {
    ID1: {
      id: 'ID1',
      amount: 100000,
      unique_code: 123,
      status: 'SUCCESS',
      sender_bank: 'bca',
      account_number: '1234567890',
      beneficiary_name: 'John Doe',
      beneficiary_bank: 'bri',
      remark: 'Payment',
      created_at: '2024-06-01T10:00:00Z',
    },
    ID2: {
      id: 'ID2',
      amount: 250000,
      unique_code: 456,
      status: 'PENDING',
      sender_bank: 'mandiri',
      account_number: '0987654321',
      beneficiary_name: 'Jane Smith',
      beneficiary_bank: 'bni',
      remark: 'Transfer',
      created_at: '2024-06-02T11:00:00Z',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactionList', () => {
    it('should fetch and transform transaction list successfully', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: mockApiResponse,
      });

      const result = await transactionService.getTransactionList({ skip: 0 });

      expect(apiClient.get).toHaveBeenCalledWith('/frontend-test');
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 'ID1',
        amount: 100000,
        unique_code: 123,
        status: 'SUCCESS',
        sender_bank: 'bca',
        account_number: '1234567890',
        beneficiary_name: 'John Doe',
        beneficiary_bank: 'bri',
        remark: 'Payment',
        created_at: '2024-06-01T10:00:00Z',
        uniqueCode: 123,
        senderBank: 'bca',
        accountNumber: '1234567890',
        beneficiaryName: 'John Doe',
        beneficiaryBank: 'bri',
        createdAt: '2024-06-01T10:00:00Z',
      });
    });

    it('should throw error when response data is null', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: null,
      });

      await expect(
        transactionService.getTransactionList({ skip: 0 }),
      ).rejects.toThrow('No data found');
    });

    it('should throw error when response data is not an object', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: 'invalid',
      });

      await expect(
        transactionService.getTransactionList({ skip: 0 }),
      ).rejects.toThrow('No data found');
    });

    it('should throw error when API call fails', async () => {
      const error = new Error('Network error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(
        transactionService.getTransactionList({ skip: 0 }),
      ).rejects.toThrow('Network error');
    });

    it('should handle empty response object', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({
        data: {},
      });

      const result = await transactionService.getTransactionList({ skip: 0 });

      expect(result).toEqual([]);
    });
  });
});
