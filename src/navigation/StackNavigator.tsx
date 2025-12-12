import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import TabsNavigator from './TabsNavigator';

export type RootStackParamList = {
  Login: undefined;
  Tabs: { userName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
      />
      <Stack.Screen 
        name="Tabs" 
        component={TabsNavigator}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
