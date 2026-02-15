import { GridDetail } from '@src/features/transaction/components/GridDetail';
import { render, screen } from '@testing-library/react-native';

describe('GridDetail', () => {
  const mockValues = [
    [
      { title: '- SYIFA SALSABYLA', value: '0313955548' },
      { title: 'NOMINAL', value: 'Rp10.028' },
    ],
    [
      { title: 'BERITA TRANSFER', value: 'Note test' },
      { title: 'KODE UNIK', value: '49' },
    ],

    [{ title: 'WAKTU DIBUAT', value: '8 April 2020' }],
  ];

  it('renders correctly', () => {
    render(<GridDetail values={mockValues} />);

    for (let index = 0; index < mockValues.length; index++) {
      const element = mockValues[index];
      element.forEach(item => {
        expect(screen.getByText(item.title)).toBeTruthy();
        expect(screen.getByText(item.value)).toBeTruthy();
      });
    }
  });
});
