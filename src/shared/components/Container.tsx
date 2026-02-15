import { Colors } from '@src/constants/colors';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 6 },
});
