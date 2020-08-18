import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DiscoverStack from './DiscoverStack';
import HomeStack from './HomeStack';
import EStyleSheet from 'react-native-extended-stylesheet';

const Tabs = createBottomTabNavigator();

// const getTabBarVisibility = (route) => {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : '';

//   if (
//     routeName === 'AnimeInfoScreen' ||
//     routeName === 'SearchScreen' ||
//     routeName === 'DiscoverAnime' ||
//     routeName === 'CharScreen'
//   ) {
//     return false;
//   }

//   return true;
// };
const AppTabs = () => {
  console.log('AppTabs');
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              return <AntDesign name={'home'} size={size} color={color} />;
            } else if (route.name === 'DiscoverStack') {
              return <Ionicons name={'flask'} size={size} color={color} />;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: EStyleSheet.value('$spcColor'),
          inactiveTintColor: 'gray',
          keyboardHidesTabBar: true,
          showLabel: false,

          style: {
            backgroundColor: EStyleSheet.value('$baseColor'),
            borderTopWidth: 0,

            position: 'absolute',
          },
        }}>
        <Tabs.Screen
          // options={({route}) => ({
          //   tabBarVisible: getTabBarVisibility(route),
          // })}
          name="Home"
          component={HomeStack}
        />
        <Tabs.Screen
          // options={({route}) => ({
          //   tabBarVisible: getTabBarVisibility(route),
          // })}
          name="DiscoverStack"
          component={DiscoverStack}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default AppTabs;
