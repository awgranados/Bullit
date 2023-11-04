import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FindRideScreen from './screens/FindRideScreen';
import RideListScreen from './screens/RideListScreen';

const PassengerStack = createStackNavigator();

function FindRideNavigator() {
  return (
    <PassengerStack.Navigator initialRouteName="FindRidePage">
        <PassengerStack.Screen name="FindRidePage" component={FindRideScreen}  options={{ headerShown: false }}/>
        <PassengerStack.Screen name="RideList" component={RideListScreen} />
    </PassengerStack.Navigator>
  );
}

export default FindRideNavigator;