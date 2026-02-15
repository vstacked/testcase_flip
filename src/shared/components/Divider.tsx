import { ColorValue, StyleSheet, View } from 'react-native';

export const Divider: React.FC<{ height?: number; color?: ColorValue }> = ({
  height = 1,
  color = 'rgba(0,0,0,0.1)',
}) => {
  return (
    <View style={[{ height, backgroundColor: color }, styles.fullWidth]} />
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});
