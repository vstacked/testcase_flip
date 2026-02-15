import { StyleSheet, Text, View } from 'react-native';

export const GridDetail: React.FC<{
  values: Array<Array<{ title: string; value: string }>>;
}> = ({ values }) => {
  return (
    <View style={styles.spacing}>
      {values.map((e, index) => {
        return (
          <View key={`gridDetail-${index}`} style={styles.row}>
            {e.map((i, subIndex) => {
              return (
                <GridDetailItem
                  key={`gridDetailItem-${subIndex}`}
                  flex={subIndex % 2 === 1 ? 0.65 : 1}
                  title={i.title}
                  value={i.value}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const GridDetailItem: React.FC<{
  flex?: number;
  title: string;
  value: string;
}> = ({ flex = 1, title, value }) => {
  return (
    <View style={{ flex }}>
      <Text style={styles.title}>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  spacing: { padding: 12, gap: 15 },
  row: { flexDirection: 'row' },
  title: { fontWeight: '600' },
});
