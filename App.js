import React from 'react';
import AppTabs from './src/routes/AppTabs';
import { Provider } from 'react-redux';
import store from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider, QueryClient } from "react-query";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaView, Text } from 'react-native';
import DummyScreen from './src/Screens/DummyScreen';
const App = () => {
  const queryClient = new QueryClient();
  SplashScreen.hide();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <AppTabs />
          {/* <Text>
            HI
          </Text> */}
          {/* <DummyScreen /> */}
        </Provider>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
