import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
// import SearchScreen from '../Screens/SearchScreen';
// import AnimeInfoScreen from '../Screens/AnimeInfoScreen';
// import CharScreen from '../Screens/CharScreen';
const Stack = createStackNavigator();

const HomeStack = React.memo(({navigation, route}) => {
  console.log('HomeStack');

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTintColor: 'white',
        title: false,
        cardStyle: {opacity: 1},
      }}
      initialRouteName="HomeScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />
      {/* <Stack.Screen name="CharScreen" component={CharScreen} />
      <Stack.Screen
        options={{headerShown: false}}
        name="AnimeInfoScreen"
        component={AnimeInfoScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchScreen"
        component={SearchScreen}
      /> */}
    </Stack.Navigator>
  );
});

export default HomeStack;
