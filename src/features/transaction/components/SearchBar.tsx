import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@src/constants/colors';
import { filterOptions } from '@src/constants/filterOptions';
import useDebounce from '@src/shared/hook/useDebounce';
import { useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const SearchBar: React.FC<{
  onTapOptions: () => void;
  option: (typeof filterOptions)[number];
  onValueChange: (value: string) => void;
}> = ({ onTapOptions, option, onValueChange }) => {
  const inputRef = useRef<TextInput | null>(null);

  const debounce = useDebounce(onValueChange, 300);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
      >
        <FontAwesome6
          name="magnifying-glass"
          iconStyle="solid"
          size={16}
          color={'rgba(0,0,0,0.25)'}
        />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        accessibilityRole="search"
        style={styles.searchInput}
        placeholder="Cari nama, bank, atau nominal"
        placeholderTextColor={'rgba(0,0,0,0.25)'}
        keyboardType="web-search"
        onChange={e => {
          debounce(e.nativeEvent.text);
        }}
      />
      <TouchableOpacity
        style={styles.sortButton}
        activeOpacity={0.5}
        onPress={onTapOptions}
      >
        <Text style={styles.sortButtonText}>{option}</Text>
        <FontAwesome6
          name="angle-down"
          iconStyle="solid"
          color={Colors.secondaryColor}
          size={14}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sortButtonText: {
    color: Colors.secondaryColor,
    fontSize: 12,
    fontWeight: '600',
  },
});
