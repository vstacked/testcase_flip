import { renderHook, act } from '@testing-library/react-native';
import useGetKeyboardOffset from '@src/shared/hook/useGetKeyboardOffset';
import { Keyboard, Platform } from 'react-native';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ bottom: 20, top: 0, left: 0, right: 0 }),
}));

describe('useGetKeyboardOffset', () => {
  let keyboardShowCallback: ((e: any) => void) | null = null;
  let keyboardHideCallback: (() => void) | null = null;

  const mockRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    keyboardShowCallback = null;
    keyboardHideCallback = null;

    jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation((event, callback) => {
        if (event === 'keyboardDidShow') {
          keyboardShowCallback = callback as (e: any) => void;
        } else if (event === 'keyboardDidHide') {
          keyboardHideCallback = callback as () => void;
        }
        return { remove: mockRemove } as any;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return initial offset of 0', () => {
    const { result } = renderHook(() => useGetKeyboardOffset());

    expect(result.current.offset).toBe(0);
  });

  it('should set offset when keyboard shows on Android', () => {
    Platform.OS = 'android';

    const { result } = renderHook(() => useGetKeyboardOffset());

    act(() => {
      keyboardShowCallback?.({ endCoordinates: { height: 300 } });
    });

    // Android adds insets.bottom (20) to the height
    expect(result.current.offset).toBe(320);
  });

  it('should set offset when keyboard shows on iOS', () => {
    Platform.OS = 'ios';

    const { result } = renderHook(() => useGetKeyboardOffset());

    act(() => {
      keyboardShowCallback?.({ endCoordinates: { height: 300 } });
    });

    // iOS uses height directly without adding insets
    expect(result.current.offset).toBe(300);
  });

  it('should reset offset to 0 when keyboard hides', () => {
    Platform.OS = 'android';

    const { result } = renderHook(() => useGetKeyboardOffset());

    act(() => {
      keyboardShowCallback?.({ endCoordinates: { height: 300 } });
    });

    expect(result.current.offset).toBe(320);

    act(() => {
      keyboardHideCallback?.();
    });

    expect(result.current.offset).toBe(0);
  });

  it('should not set up listeners when platform is android but OS is ios', () => {
    Platform.OS = 'ios';

    renderHook(() => useGetKeyboardOffset('android'));

    // Listeners should not be added for iOS when platform is 'android'
    expect(Keyboard.addListener).not.toHaveBeenCalled();
  });

  it('should not set up listeners when platform is ios but OS is android', () => {
    Platform.OS = 'android';

    renderHook(() => useGetKeyboardOffset('ios'));

    // Listeners should not be added for Android when platform is 'ios'
    expect(Keyboard.addListener).not.toHaveBeenCalled();
  });

  it('should set up listeners when platform is "both"', () => {
    Platform.OS = 'android';

    renderHook(() => useGetKeyboardOffset('both'));

    expect(Keyboard.addListener).toHaveBeenCalledWith(
      'keyboardDidHide',
      expect.any(Function),
    );
    expect(Keyboard.addListener).toHaveBeenCalledWith(
      'keyboardDidShow',
      expect.any(Function),
    );
  });

  it('should set up listeners with default platform value', () => {
    Platform.OS = 'ios';

    renderHook(() => useGetKeyboardOffset());

    expect(Keyboard.addListener).toHaveBeenCalledTimes(2);
  });

  it('should remove listeners on unmount', () => {
    Platform.OS = 'android';

    const { unmount } = renderHook(() => useGetKeyboardOffset());

    unmount();

    expect(mockRemove).toHaveBeenCalledTimes(2);
  });
});
