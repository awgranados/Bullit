import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeNavigator from "./HomePageNavigator";
import PassengerNavigator from './PassengerPageNavigator';
import DriverNavigator from './DriverPageNavigator';

//Screen names
const homeName = "Home";
const driverName = "Rides";
const passengerName = "Profile";
const splashName = "Splash";

const backgroundColor = "#002E5D";
const primaryColor = "#FFC72C";
const accentColor = "#FF4618";
const textColor = "#FFFFFF";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === driverName) {
            iconName = focused ? "car" : "car-outline";
          } else if (rn === passengerName) {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFC72C",
        tabBarInactiveTintColor: textColor,
        tabBarActiveBackgroundColor: backgroundColor,
        tabBarInactiveBackgroundColor: backgroundColor,
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontSize: 12,
        },
        tabBarStyle: [
          {
            display: "flex",
          },
            null
          ]
        })}
        >

        <Tab.Screen name={homeName} component={HomeNavigator} />
        <Tab.Screen name={driverName} component={DriverNavigator} 
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            // Navigate to the DriverPage
            navigation.navigate(driverName, { screen: 'DriverPage' });
          },
        })}/>
        <Tab.Screen name={passengerName} component={PassengerNavigator} listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(passengerName, { screen: 'PassengerPage' });
          },
        })}/>

      </Tab.Navigator>
  );
}

export default MainContainer;
