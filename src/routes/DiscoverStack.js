import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiscoverScreen from '../Screens/Discover';
import DiscoverAnime from '../Components/Discover/DiscoverAnime/DiscoverAnime';
import EStyleSheet from 'react-native-extended-stylesheet';
import CharTabView from '../Components/Discover/DiscoverCharacter/CharTabView';
import CharScreen from '../Screens/CharScreen';
import SearchScreen from '../Screens/SearchScreen';
import AnimeInfoScreen from '../Screens/AnimeInfoScreen';
import verticalAnimation from "../reusable/verticalAnimation"

//import {createFluidNavigator} from 'react-navigation-fluid-transitions';
const Stack = createStackNavigator();

const HomeStack = React.memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { opacity: 1 },
      }}
      initialRouteName="DiscoverScreen">
      <Stack.Screen
        options={{ headerShown: false, ...verticalAnimation }}
        name="DiscoverScreen"
        component={DiscoverScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerShown: true,
          title: route.params.title,
          headerTintColor: 'white',
          //   headerTitleStyle: {color: 'white'},
          headerStyle: {
            backgroundColor: EStyleSheet.value('$baseColor'),
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },

          headerBackTitleStyle: { color: 'white' },
          ...verticalAnimation
        })}
        // options={({route}) => ({title: route.params.title})}
        name="DiscoverAnime"
        component={DiscoverAnime}
      />
      <Stack.Screen

        options={{
          headerShown: true,
          title: 'Characters',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: EStyleSheet.value('$baseColor'),
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },

          headerBackTitleStyle: { color: 'white' },
          ...verticalAnimation
        }}
        name="CharTabView"
        component={CharTabView}
      />
      <Stack.Screen
        options={{ headerShown: false, animationEnabled: false, ...verticalAnimation }}
        name="SearchScreen"
        component={SearchScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white',
          title: false,
          ...verticalAnimation
        }}
        name="CharScreen"
        component={CharScreen}
      />
      <Stack.Screen
        options={{ headerShown: false, ...verticalAnimation }}
        name="AnimeInfoScreen"
        component={AnimeInfoScreen}
      />
    </Stack.Navigator>
    // <Navigator />
  );
});

export default HomeStack;
