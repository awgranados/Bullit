import { View, Text, Button } from 'react-native'
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import {CreateButton} from 'app/app/button';
import RideContext from '../context/RideContext';

const CreateRideRequestScreen = () => {
    const [dest, setDest] = React.useState("");
    const [desire_fuel_price, setFuelPrice] = React.useState("");
    const navigation = useNavigation();  // Get the navigation prop

    const { addRideRequest } = React.useContext(RideContext);

    const handleDone = () => {
      addRideRequest({ destination: dest, fuelPrice: desire_fuel_price });
      navigation.navigate('Driver');
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button title="Back" onPress={() => navigation.goBack()} />  // Back button to navigate back
            ),
        });
    }, [navigation]); 

    return (
    <View style={{ padding: 16 }}>

      <TextInput
        label="Destination"
        value={dest}
        onChangeText={dest => setDest(dest)}
        mode='outlined'
      />

      <TextInput
          label="Desired Fuel Price"
          value={desire_fuel_price}
          onChangeText={desire_fuel_price => setFuelPrice(desire_fuel_price)}
          mode='outlined'
      />

      <View style={{ marginTop: 20 }}>
        <CreateButton text='Done' onPress={handleDone} />
      </View>

      </View>
    );
}

export default CreateRideRequestScreen