import { filterOptions } from '@src/constants/filterOptions';
import { TransactionResponse } from '../api/transaction.service';

const useLocalFunction = () => {
  const searchItems = (
    keyword: string,
    values: TransactionResponse[],
  ): TransactionResponse[] => {
    if (keyword.length === 0) return values;

    const _keyword = keyword.toLowerCase();

    return values.filter(item => {
      const fields = [
        item.beneficiaryName,
        item.senderBank,
        item.beneficiaryBank,
        item.amount.toString(),
      ].map(f => f.toLowerCase());
      return fields.some(f => f.includes(_keyword));
    });
  };

  const filterItems = (
    option: (typeof filterOptions)[number],
    values: TransactionResponse[],
  ): TransactionResponse[] => {
    if (option === 'URUTKAN') return values;

    const sortedValues = [...values];

    const sortByName = (order: 'asc' | 'desc') =>
      sortedValues.sort((a, b) =>
        order === 'asc'
          ? a.beneficiaryName.localeCompare(b.beneficiaryName)
          : b.beneficiaryName.localeCompare(a.beneficiaryName),
      );

    const sortByDate = (order: 'asc' | 'desc') =>
      sortedValues.sort((a, b) => {
        const diff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return order === 'asc' ? diff : -diff;
      });

    switch (option) {
      case 'Nama A-Z':
        return sortByName('asc');
      case 'Nama Z-A':
        return sortByName('desc');
      case 'Tanggal Terbaru':
        return sortByDate('desc');
      case 'Tanggal Terlama':
        return sortByDate('asc');
    }
  };

  return { searchItems, filterItems };
};

export default useLocalFunction;
