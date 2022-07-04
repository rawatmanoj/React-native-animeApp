import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DiscoverStack from './DiscoverStack';
import HomeStack from './HomeStack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, SafeAreaView } from "react-native";
import { SafeAreaProvider, } from 'react-native-safe-area-context';
import linking from "../linking"


const Tabs = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (
    // routeName === 'HomeScreen' ||
    // routeName === 'AnimeInfoScreen' ||
    routeName === 'SearchScreen'
    // routeName === 'DiscoverAnime' ||
    // routeName === 'CharScreen'
  ) {
    return false;
  }

  return true;
};
const AppTabs = () => {
  console.log('AppTabs');
  return (
    <SafeAreaView style={{ flex: 1, }} >
      <NavigationContainer linking={linking}>
        <Tabs.Navigator

          screenOptions={({ route }) => ({
            // tabBarVisible: getTabBarVisibility(route),
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
                return <AntDesign name={'home'} size={size} color={color} />;
              } else if (route.name === 'DiscoverStack') {
                return <Ionicons name={'flask'} size={size} color={color} />;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          barStyle={{ backgroundColor: 'red' }}

          tabBarOptions={{

            activeTintColor: EStyleSheet.value('$spcColor'),
            inactiveTintColor: 'gray',
            //  activeBackgroundColor: 'gray',
            keyboardHidesTabBar: true,
            showLabel: false,

            tabStyle: {
              paddingBottom: 0
            },
            safeAreaInsets: {
              bottom: 0
            },
            style: {
              backgroundColor: EStyleSheet.value('$baseColor'),
              //backgroundColor: 'transparent',
              borderTopWidth: 0,
              paddingBottom: 0,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0
            },
          }}>
          <Tabs.Screen
            name="Home"
            component={HomeStack}
          />
          <Tabs.Screen

            name="DiscoverStack"
            component={DiscoverStack}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppTabs;
