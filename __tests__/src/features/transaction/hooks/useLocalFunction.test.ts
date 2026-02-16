import { renderHook } from '@testing-library/react-native';
import useLocalFunction from '@src/features/transaction/hooks/useLocalFunction';
import { TransactionResponse } from '@src/features/transaction';

const mockTransactions: TransactionResponse[] = [
  {
    id: 'FT001',
    amount: 1000000,
    uniqueCode: 100,
    status: 'SUCCESS',
    senderBank: 'bni',
    accountNumber: '1234567890',
    beneficiaryName: 'Alice Johnson',
    beneficiaryBank: 'bca',
    remark: 'Payment 1',
    createdAt: '2026-02-10 10:00:00',
  },
  {
    id: 'FT002',
    amount: 2500000,
    uniqueCode: 200,
    status: 'PENDING',
    senderBank: 'mandiri',
    accountNumber: '0987654321',
    beneficiaryName: 'Bob Smith',
    beneficiaryBank: 'bri',
    remark: 'Payment 2',
    createdAt: '2026-02-15 14:30:00',
  },
  {
    id: 'FT003',
    amount: 500000,
    uniqueCode: 300,
    status: 'SUCCESS',
    senderBank: 'bca',
    accountNumber: '1122334455',
    beneficiaryName: 'Charlie Brown',
    beneficiaryBank: 'mandiri',
    remark: 'Payment 3',
    createdAt: '2026-02-12 08:15:00',
  },
];

describe('useLocalFunction', () => {
  describe('searchItems', () => {
    it('should return all items when keyword is empty', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems('', mockTransactions);

      expect(searchResult).toEqual(mockTransactions);
      expect(searchResult).toHaveLength(3);
    });

    it('should filter by beneficiary name (case insensitive)', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems(
        'alice',
        mockTransactions,
      );

      expect(searchResult).toHaveLength(1);
      expect(searchResult[0].beneficiaryName).toBe('Alice Johnson');
    });

    it('should filter by beneficiary name with uppercase keyword', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems(
        'ALICE',
        mockTransactions,
      );

      expect(searchResult).toHaveLength(1);
      expect(searchResult[0].beneficiaryName).toBe('Alice Johnson');
    });

    it('should filter by sender bank', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems('bni', mockTransactions);

      expect(searchResult).toHaveLength(1);
      expect(searchResult[0].senderBank).toBe('bni');
    });

    it('should filter by beneficiary bank', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems('bri', mockTransactions);

      expect(searchResult).toHaveLength(1);
      expect(searchResult[0].beneficiaryBank).toBe('bri');
    });

    it('should filter by amount', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems(
        '2500000',
        mockTransactions,
      );

      expect(searchResult).toHaveLength(1);
      expect(searchResult[0].amount).toBe(2500000);
    });

    it('should filter by partial amount match', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems(
        '500000',
        mockTransactions,
      );

      expect(searchResult).toHaveLength(2);
    });

    it('should return empty array when no matches found', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems(
        'nonexistent',
        mockTransactions,
      );

      expect(searchResult).toHaveLength(0);
    });

    it('should match partial beneficiary name', () => {
      const { result } = renderHook(() => useLocalFunction());

      const searchResult = result.current.searchItems('john', mockTransactions);

      expect(searchResult).toHaveLength(1);
      expect(searchResult[0].beneficiaryName).toBe('Alice Johnson');
    });

    it('should return multiple matches when keyword matches multiple items', () => {
      const { result } = renderHook(() => useLocalFunction());

      //* 'a' appears in 'Alice', 'mandiri', 'bca', 'Charlie', etc.
      const searchResult = result.current.searchItems('a', mockTransactions);

      expect(searchResult.length).toBeGreaterThan(1);
    });
  });

  describe('filterItems', () => {
    it('should return original items when option is URUTKAN', () => {
      const { result } = renderHook(() => useLocalFunction());

      const filterResult = result.current.filterItems(
        'URUTKAN',
        mockTransactions,
      );

      expect(filterResult).toEqual(mockTransactions);
    });

    it('should sort by name A-Z', () => {
      const { result } = renderHook(() => useLocalFunction());

      const filterResult = result.current.filterItems(
        'Nama A-Z',
        mockTransactions,
      );

      expect(filterResult[0].beneficiaryName).toBe('Alice Johnson');
      expect(filterResult[1].beneficiaryName).toBe('Bob Smith');
      expect(filterResult[2].beneficiaryName).toBe('Charlie Brown');
    });

    it('should sort by name Z-A', () => {
      const { result } = renderHook(() => useLocalFunction());

      const filterResult = result.current.filterItems(
        'Nama Z-A',
        mockTransactions,
      );

      expect(filterResult[0].beneficiaryName).toBe('Charlie Brown');
      expect(filterResult[1].beneficiaryName).toBe('Bob Smith');
      expect(filterResult[2].beneficiaryName).toBe('Alice Johnson');
    });

    it('should sort by date newest first (Tanggal Terbaru)', () => {
      const { result } = renderHook(() => useLocalFunction());

      const filterResult = result.current.filterItems(
        'Tanggal Terbaru',
        mockTransactions,
      );

      expect(filterResult[0].createdAt).toBe('2026-02-15 14:30:00');
      expect(filterResult[1].createdAt).toBe('2026-02-12 08:15:00');
      expect(filterResult[2].createdAt).toBe('2026-02-10 10:00:00');
    });

    it('should sort by date oldest first (Tanggal Terlama)', () => {
      const { result } = renderHook(() => useLocalFunction());

      const filterResult = result.current.filterItems(
        'Tanggal Terlama',
        mockTransactions,
      );

      expect(filterResult[0].createdAt).toBe('2026-02-10 10:00:00');
      expect(filterResult[1].createdAt).toBe('2026-02-12 08:15:00');
      expect(filterResult[2].createdAt).toBe('2026-02-15 14:30:00');
    });

    it('should handle empty array', () => {
      const { result } = renderHook(() => useLocalFunction());

      const filterResult = result.current.filterItems('Nama A-Z', []);

      expect(filterResult).toEqual([]);
    });

    it('should handle single item array', () => {
      const { result } = renderHook(() => useLocalFunction());
      const singleItem = [mockTransactions[0]];

      const filterResult = result.current.filterItems('Nama A-Z', singleItem);

      expect(filterResult).toHaveLength(1);
      expect(filterResult[0]).toEqual(mockTransactions[0]);
    });
  });

  describe('combined searchItems and filterItems', () => {
    it('should search and then filter items correctly', () => {
      const { result } = renderHook(() => useLocalFunction());

      //* First search for items containing 'a'
      const searchResult = result.current.searchItems('a', mockTransactions);

      //* Then sort by name A-Z
      const filterResult = result.current.filterItems('Nama A-Z', searchResult);

      //* Verify the results are sorted alphabetically
      for (let i = 0; i < filterResult.length - 1; i++) {
        expect(
          filterResult[i].beneficiaryName.localeCompare(
            filterResult[i + 1].beneficiaryName,
          ),
        ).toBeLessThanOrEqual(0);
      }
    });
  });
});
