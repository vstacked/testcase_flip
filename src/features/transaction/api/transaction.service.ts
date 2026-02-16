import { apiClient } from '@src/api/client';
import { filterOptions } from '@src/constants/filterOptions';

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
  getTransactionList: async ({
    limit = 10,
    skip,
    option,
  }: {
    limit?: number;
    skip: number;
    option?: (typeof filterOptions)[number];
  }): Promise<TransactionResponse[]> => {
    try {
      let queryParams: any = { limit, skip };
      if (option) {
        switch (option) {
          case 'Nama A-Z':
            queryParams.sortBy = 'title';
            break;
          case 'Nama Z-A':
            queryParams.sortBy = 'body';
            break;
          case 'Tanggal Terbaru':
            queryParams.order = 'desc';
            break;
          case 'Tanggal Terlama':
            queryParams.order = 'asc';
            break;
        }
      }

      const response = await apiClient.get(
        `/frontend-test`,
        // queryParams
      );
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
