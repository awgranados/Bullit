import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';


const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="ProfilePage">
      <ProfileStack.Screen name="ProfilePage" component={ProfileScreen} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  );
}

export default ProfileNavigator;