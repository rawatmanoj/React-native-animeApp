import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import verticalAnimation from "../reusable/verticalAnimation"

//import {createFluidNavigator} from 'react-navigation-fluid-transitions';
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { opacity: 1 },
            }}
            initialRouteName="ProfileScreen">
            <Stack.Screen
                options={{ headerShown: false, ...verticalAnimation }}
                name="ProfileScreen"
                component={ProfileScreen}
            />

        </Stack.Navigator>
        // <Navigator />
    );
}

export default HomeStack;
