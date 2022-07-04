import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import AnimeInfoScreen from '../Screens/AnimeInfoScreen';
import CharScreen from '../Screens/CharScreen';
import { Linking, SafeAreaView } from "react-native";
import verticalAnimation from "../reusable/verticalAnimation"
import LoadMore from '../Screens/LoadMore';
import reactotron from 'reactotron-react-native';

const Stack = createStackNavigator();

const HomeStack = React.memo(({ navigation, route }) => {

  const redirectLinkPage = (linkURL) => {
    reactotron.log('AppLink=>>>', linkURL);
    reactotron.log(route, "routeeeeee")

  }


  useEffect(() => {

    Linking.getInitialURL().then((url) => {
      // reactotron.log('AppLink=>>>', url);
      redirectLinkPage(url);
    }).catch(err => reactotron.error('An error occurred', err));


  }, []);


  reactotron.log(route, navigation, 'HomeStack');
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          headerStatusBarHeight: 0,
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white',
          title: false,
          cardStyle: { opacity: 1 },
          // animationEnabled: false,
        }}
        initialRouteName="HomeScreen">
        <Stack.Screen
          options={{ headerShown: false, ...verticalAnimation }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen name="CharScreen" component={CharScreen} />
        <Stack.Screen
          options={{ headerShown: false, ...verticalAnimation }}
          name="AnimeInfoScreen"
          component={AnimeInfoScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, ...verticalAnimation }}
          name="SearchScreen"
          component={SearchScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, ...verticalAnimation }}
          name="LoadMore"
          component={LoadMore}
        />

      </Stack.Navigator>
    </SafeAreaView>
  );
});

export default HomeStack;
