import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@src/navigation/RootStack';

function App() {
  return (
    <SafeAreaProvider testID="SafeAreaProvider">
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
