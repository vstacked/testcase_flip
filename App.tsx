import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@src/navigation/RootStack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <SafeAreaProvider testID="SafeAreaProvider">
      <StatusBar barStyle={'light-content'} />
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
