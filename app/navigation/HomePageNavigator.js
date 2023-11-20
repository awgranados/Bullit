import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RideDetailScreen from './screens/RideDetailScreen';

const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="HomePage">
      <HomeStack.Screen name="HomePage" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="RideDetail" component={RideDetailScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;