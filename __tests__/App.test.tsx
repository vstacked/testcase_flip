import React from 'react';
import App from '../App';
import { renderAsync, screen } from '@testing-library/react-native';

test('renders correctly', async () => {
  await renderAsync(<App />);
  expect(screen.getByTestId('SafeAreaProvider')).toBeOnTheScreen();
});
