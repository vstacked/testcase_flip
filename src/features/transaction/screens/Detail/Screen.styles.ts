import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: { backgroundColor: 'white', paddingVertical: 8 },
  header: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    padding: 12,
  },
  subHeader: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
  },
  headerText: { fontSize: 14, fontWeight: '600' },
  spacing: { height: 20, justifyContent: 'center' },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  cardTitleText: { fontSize: 17, fontWeight: '700' },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
