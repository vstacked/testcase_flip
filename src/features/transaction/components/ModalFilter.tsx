import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@src/constants/colors';
import { filterOptions } from '@src/constants/filterOptions';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ModalFilter: React.FC<{
  showModal: boolean;
  value: (typeof filterOptions)[number];
  onClose: () => void;
  onSelect: (option: (typeof filterOptions)[number]) => void;
}> = ({ showModal, value, onClose, onSelect }) => {
  if (!showModal) return;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      testID="outside-modal-filter"
      onPress={() => {
        onClose();
      }}
    >
      <View style={styles.content}>
        {filterOptions.map(e => {
          const selected = value === e;
          return (
            <TouchableOpacity
              key={e}
              activeOpacity={0.5}
              onPress={() => {
                onSelect(e);
                onClose();
              }}
              style={styles.option}
            >
              <View style={styles.center}>
                <FontAwesome6
                  name="o"
                  iconStyle="solid"
                  size={18}
                  color={Colors.secondaryColor}
                />
                {selected && (
                  <FontAwesome6
                    name="circle"
                    iconStyle="solid"
                    testID="option-selected"
                    size={8}
                    color={Colors.secondaryColor}
                    style={styles.absolute}
                  />
                )}
              </View>

              <Text style={styles.optionText}>{e}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    margin: 24,
    borderRadius: 5,
    paddingVertical: 24,
  },
  option: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: { position: 'absolute' },
  optionText: { fontSize: 15, fontWeight: '400' },
});
