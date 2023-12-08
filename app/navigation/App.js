import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import MainContainer from "./MainContainer";
import { registerRootComponent } from "expo";
import { RideProvider } from "./context/RideContext";
import Splash from "./screens/SplashScreen";
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  const [rides, setRides] = React.useState([]);
  let [fontsLoaded] = useFonts({
    'Dhurjati': require('../assets/Dhurjati-Regular.ttf'),
    'Montserrat-Regular': require('../assets/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/Montserrat-Bold.ttf')
  })

  return (
    <RideProvider value={{ rides, setRides }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
          <Stack.Screen name="Splash" component={Splash}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="MainContainer"
            component={MainContainer}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RideProvider>
  );
}

registerRootComponent(App);
