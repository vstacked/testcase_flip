import React from 'react';
import App from '../App';
import { cleanup, renderAsync, screen } from '@testing-library/react-native';

afterEach(cleanup);

test('renders correctly', async () => {
  await renderAsync(<App />);
  expect(screen.getByTestId('SafeAreaProvider')).toBeOnTheScreen();
});
