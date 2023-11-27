import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PassengerScreen from './screens/PassengerScreen';

const PassengerStack = createStackNavigator();

function PassengerNavigator() {
  return (
    <PassengerStack.Navigator initialRouteName="PassengerPage">
      <PassengerStack.Screen name="PassengerPage" component={PassengerScreen} options={{ headerShown: false }} />
    </PassengerStack.Navigator>
  );
}

export default PassengerNavigator;