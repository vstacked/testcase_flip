import { apiClient } from '@src/api/client';

export interface TransactionResponse {
  id: string;
  amount: number;
  uniqueCode: number;
  status: 'SUCCESS' | 'PENDING';
  senderBank: string;
  accountNumber: string;
  beneficiaryName: string;
  beneficiaryBank: string;
  remark: string;
  createdAt: string;
}

export const transactionService = {
  getTransactionList: async (): Promise<TransactionResponse[]> => {
    try {
      const response = await apiClient.get(`/frontend-test`);
      if (response.data && typeof response.data === 'object') {
        let list: TransactionResponse[] = [];

        for (const [key, item] of Object.entries(
          response.data as Record<string, any>,
        )) {
          if (!Object.hasOwn(response.data, key)) continue;
          list.push({
            ...item,
            uniqueCode: item.unique_code,
            senderBank: item.sender_bank,
            accountNumber: item.account_number,
            beneficiaryName: item.beneficiary_name,
            beneficiaryBank: item.beneficiary_bank,
            createdAt: item.created_at,
          });
        }
        return list;
      }
      throw new Error('No data found');
    } catch (e) {
      throw e;
    }
  },
};
