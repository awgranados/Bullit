import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PassengerScreen from './screens/PassengerScreen';
import CreateRideRequestScreen from './screens/CreateRideRequestScreen';

const PassengerStack = createStackNavigator();

function PassengerNavigator() {
  return (
    <PassengerStack.Navigator initialRouteName="PassengerPage">
      <PassengerStack.Screen name="PassengerPage" component={PassengerScreen} options={{ headerShown: false }} />
      <PassengerStack.Screen name="CreateRideRequest" component={CreateRideRequestScreen} />
    </PassengerStack.Navigator>
  );
}

export default PassengerNavigator;