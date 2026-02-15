import React, { useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useGetKeyboardOffset = (
  platform: 'android' | 'ios' | 'both' = 'both',
) => {
  const insets = useSafeAreaInsets();

  const [offset, setOffset] = useState(0);

  React.useEffect(() => {
    if (platform !== 'both') {
      if (platform === 'android' && Platform.OS === 'ios') return;
      if (platform === 'ios' && Platform.OS === 'android') return;
    }

    const handleSetOffset = async (val: number) => {
      if (Platform.OS === 'android') {
        setOffset(val + insets.bottom);
      } else {
        setOffset(val);
      }
    };

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setOffset(0);
      },
    );
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        handleSetOffset(e.endCoordinates.height);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [platform, insets.bottom]);

  return { offset };
};

export default useGetKeyboardOffset;
