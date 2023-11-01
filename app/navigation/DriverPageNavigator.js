import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DriverScreen from './screens/DriverScreen';
import CreateRideOfferScreen from './screens/CreateRideOfferScreen';

const DriverStack = createStackNavigator();

function DriverNavigator() {
  return (
    <DriverStack.Navigator initialRouteName="DriverPage">
      <DriverStack.Screen name="DriverPage" component={DriverScreen} options={{ headerShown: false }} />
      <DriverStack.Screen name="CreateRideOffer" component={CreateRideOfferScreen} />
    </DriverStack.Navigator>
  );
}

export default DriverNavigator;