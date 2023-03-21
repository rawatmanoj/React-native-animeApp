/* eslint-disable prettier/prettier */
import React from 'react';
import AppTabs from './src/routes/AppTabs';
import { Provider } from 'react-redux';
import store from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider, QueryClient } from "react-query";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaView, Text } from 'react-native';
import DummyScreen from './src/Screens/DummyScreen';
import { useEffect } from 'react';
import { Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GetUserDetails } from './src/api/User/UserDetails';
import TorrentSearchApi from 'torrent-search-api';

const App = () => {
  const queryClient = new QueryClient();
  SplashScreen.hide();

  useEffect(() => {
    Linking.addEventListener('url', async ({ url }) => {
      let token = url.split('access_token=')[1].split('&')[0];
      AsyncStorage.setItem('token', token);
    });
    const getUser = async () => {
      const res = await GetUserDetails();
      const torrent =
        console.log(res, 'resssssssssssss');
    };

    const getTorrent = async () => {
      // TorrentSearchApi.enableProvider('Torrent9');
      // const torrents = await TorrentSearchApi.search('1080', 'Movies', 20);
      // console.log(torrents)
    }

    getUser();
    getTorrent()

  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <AppTabs />
          {/* <Text>
            HI
          </Text>
          <DummyScreen /> */}
        </Provider>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
