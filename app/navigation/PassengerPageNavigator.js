import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PassengerScreen from './screens/PassengerScreen';
import CreateRideRequestScreen from './screens/CreateRideRequestScreen';
import FindRideScreen from './screens/FindRideScreen';
import FindRideNavigator from './FindRidePageNavigator';

const PassengerStack = createStackNavigator();

function PassengerNavigator() {
  return (
    <PassengerStack.Navigator initialRouteName="PassengerPage">
      <PassengerStack.Screen name="PassengerPage" component={PassengerScreen} options={{ headerShown: false }} />
      <PassengerStack.Screen name="CreateRideRequest" component={CreateRideRequestScreen} />
      <PassengerStack.Screen name="FindRide" component={FindRideNavigator} />
    </PassengerStack.Navigator>
  );
}

export default PassengerNavigator;