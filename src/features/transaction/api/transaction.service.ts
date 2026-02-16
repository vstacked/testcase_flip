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

// const dummyData = {"FT8467":{"id":"FT8467","amount":3402775,"unique_code":87,"status":"SUCCESS","sender_bank":"bni","account_number":"3153113558","beneficiary_name":"Rhiannan Simmons","beneficiary_bank":"bri","remark":"sample remark","created_at":"2026-02-16 11:14:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT12147":{"id":"FT12147","amount":4849608,"unique_code":563,"status":"SUCCESS","sender_bank":"bni","account_number":"5121380358","beneficiary_name":"Jake Castillo","beneficiary_bank":"bri","remark":"sample remark","created_at":"2026-02-16 11:13:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT20540":{"id":"FT20540","amount":3389262,"unique_code":475,"status":"SUCCESS","sender_bank":"bni","account_number":"2051505548","beneficiary_name":"Rhiannan Simmons","beneficiary_bank":"bca","remark":"sample remark","created_at":"2026-02-16 11:12:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT44748":{"id":"FT44748","amount":4176167,"unique_code":315,"status":"SUCCESS","sender_bank":"bni","account_number":"9382793060","beneficiary_name":"Beck Glover","beneficiary_bank":"muamalat","remark":"sample remark","created_at":"2026-02-15 08:14:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT17512":{"id":"FT17512","amount":2424336,"unique_code":874,"status":"SUCCESS","sender_bank":"bni","account_number":"3679500393","beneficiary_name":"Rhiannan Simmons","beneficiary_bank":"btpn","remark":"sample remark","created_at":"2026-02-14 07:14:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT97837":{"id":"FT97837","amount":867211,"unique_code":399,"status":"SUCCESS","sender_bank":"bni","account_number":"9206244346","beneficiary_name":"Miranda Bannister","beneficiary_bank":"bri","remark":"sample remark","created_at":"2026-02-13 06:14:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT38052":{"id":"FT38052","amount":301744,"unique_code":618,"status":"SUCCESS","sender_bank":"bni","account_number":"2169071161","beneficiary_name":"Miranda Bannister","beneficiary_bank":"muamalat","remark":"sample remark","created_at":"2026-02-12 05:14:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT93972":{"id":"FT93972","amount":2978515,"unique_code":168,"status":"PENDING","sender_bank":"bni","account_number":"3374911554","beneficiary_name":"Miranda Bannister","beneficiary_bank":"mandiri","remark":"sample remark","created_at":"2026-02-11 04:14:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT2098":{"id":"FT2098","amount":2989633,"unique_code":889,"status":"SUCCESS","sender_bank":"bni","account_number":"3762673592","beneficiary_name":"Miranda Bannister","beneficiary_bank":"muamalat","remark":"sample remark","created_at":"2026-02-10 03:14:55","completed_at":"2026-02-16 11:14:55","fee":0},"FT26552":{"id":"FT26552","amount":1665484,"unique_code":381,"status":"SUCCESS","sender_bank":"bni","account_number":"6104386333","beneficiary_name":"Shanice Harwood","beneficiary_bank":"bca","remark":"sample remark","created_at":"2026-02-09 02:14:55","completed_at":"2026-02-16 11:14:55","fee":0}};
