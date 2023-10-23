import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DriverScreen from './screens/DriverScreen';
import PassengerScreen from './screens/PassengerScreen';

//Screen names
const homeName = "Home";
const driverName = "Driver";
const passengerName = "Passenger";

const backgroundColor = "#002E5D";
const primaryColor = "#FFC72C";
const accentColor = "#FF4618";
const textColor = "#FFFFFF";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor}}>
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
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
            return <Ionicons name={iconName} size={size} color={color} style={{ paddingBottom: 30,top: 40 }}/>;
          },
          tabBarActiveTintColor: "#FFC72C",
          tabBarInactiveTintColor: textColor,
          tabBarActiveBackgroundColor: backgroundColor,
          tabBarInactiveBackgroundColor: backgroundColor,
          tabBarLabelStyle: {
            paddingBottom: 15,
            fontSize: 12,
            top: 50
          },
          tabBarStyle: [
            {
              display: "flex",
              position: 'absolute',
              height: 30,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: backgroundColor,
            },
            null
          ]
        })}
        >

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={driverName} component={DriverScreen} />
        <Tab.Screen name={passengerName} component={PassengerScreen} />

      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

export default MainContainer;