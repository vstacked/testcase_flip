import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@src/constants/colors';
import { numberUtils, stringUtils, TransactionResponse } from '..';

export const TransactionItem: React.FC<{
  item: TransactionResponse;
  onTap: () => void;
}> = ({ item, onTap }) => {
  const success = item.status === 'SUCCESS';
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.card}
      onPress={onTap}
      testID="transaction-item"
    >
      <View style={styles.cardSpacing}>
        <View style={styles.cardTitle}>
          <Text style={styles.cardTitleText}>
            {stringUtils.uppercase(item.senderBank)}
          </Text>
          <FontAwesome6 name="arrow-right-long" iconStyle="solid" size={14} />
          <Text style={styles.cardTitleText}>
            {stringUtils.uppercase(item.beneficiaryBank)}
          </Text>
        </View>

        <View style={styles.cardContent}>
          <Text>{stringUtils.uppercase(item.beneficiaryName)}</Text>

          <View
            testID="badge"
            style={[
              styles.cardBadge,
              success
                ? { backgroundColor: Colors.success }
                : styles.cardBadgeBorder,
            ]}
          >
            <Text style={[styles.cardBadgeText, success && styles.textWhite]}>
              {success ? 'Berhasil' : 'Pengecekan'}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text>{numberUtils.formatAmount(item.amount)}</Text>
          <FontAwesome6 name="circle" iconStyle="solid" size={5} />
          <Text>{stringUtils.dateFormat(item.createdAt)}</Text>
        </View>
      </View>

      <View
        style={[
          styles.cardBorder,
          {
            backgroundColor: success ? Colors.success : Colors.secondaryColor,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardSpacing: { paddingVertical: 10, paddingHorizontal: 18 },
  cardTitle: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  cardTitleText: { fontSize: 15, fontWeight: '700' },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  cardBadgeBorder: {
    borderWidth: 1.25,
    borderColor: Colors.secondaryColor,
  },
  cardBadgeText: { fontSize: 12, fontWeight: '600' },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardBorder: {
    height: '100%',
    width: 6,
    position: 'absolute',
  },
  textWhite: { color: 'white' },
});
