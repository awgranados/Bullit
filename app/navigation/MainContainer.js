import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DriverScreen from './screens/DriverScreen';
import PassengerScreen from './screens/PassengerScreen';
import MapScreen from './screens/MapScreen';

//Screen names
const homeName = "Home";
const driverName = "Driver";
const passengerName = "Passenger";
const mapName = "Map";

const backgroundColor = "#002E5D";
const primaryColor = "#FFC72C";
const accentColor = "#FF4618";
const textColor = "#FFFFFF";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={mapName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === driverName) {
              iconName = focused ? 'car' : 'car-outline';

            } else if (rn === passengerName) {
              iconName = focused ? 'person' : 'person-outline';
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
            fontSize: 12
          },
          tabBarStyle: [
            {
              display: "flex"
            },
            null
          ]
        })}
        >

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={driverName} component={DriverScreen} />
        <Tab.Screen name={passengerName} component={PassengerScreen} />
        <Tab.Screen name={mapName} component={MapScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;