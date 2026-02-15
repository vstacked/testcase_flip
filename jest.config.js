module.exports = {
  preset: 'react-native',
  "transformIgnorePatterns": [
    "node_modules/(?!(@react-native|react-native|@react-navigation)/)"
  ],
  "setupFilesAfterEnv": ["./jest/setup.js"],
  moduleNameMapper: {
    '\\.(ttf)$': '<rootDir>/__mocks__/file-mock.js',
  }
};
