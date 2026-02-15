// Include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

import mockClipboard from '@react-native-clipboard/clipboard/jest/clipboard-mock.js';
import { jest } from '@jest/globals';

jest.mock('@react-native-clipboard/clipboard', () => mockClipboard);