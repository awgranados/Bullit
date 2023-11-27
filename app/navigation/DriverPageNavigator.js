import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DriverScreen from './screens/DriverScreen';
import CreateRideOfferScreen from './screens/CreateRideOfferScreen';
import FindRideScreen from './screens/FindRideScreen';
import FindRideNavigator from './FindRidePageNavigator';
import RideListScreen from './screens/RideListScreen';

const DriverStack = createStackNavigator();

function DriverNavigator() {
  return (
    <DriverStack.Navigator initialRouteName="DriverPage">
      <DriverStack.Screen name="DriverPage" component={DriverScreen} options={{ headerShown: false }} />
      <DriverStack.Screen name="CreateRideOffer" component={CreateRideOfferScreen} />
      <DriverStack.Screen name="RideList" component={RideListScreen} />
    </DriverStack.Navigator>
  );
}

export default DriverNavigator;