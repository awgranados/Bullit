import { View, Text, Button } from 'react-native'
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import { CreateButton } from 'app/app/button';
import RideContext from '../context/RideContext';

const CreateRideOfferScreen = () => {
    const [dest, setDest] = React.useState("");
    const [fuel_price, setFuelPrice] = React.useState("");
    const [departure, setDeparture] = React.useState("");

    const navigation = useNavigation();

    const { addRideOffer } = React.useContext(RideContext);

    const handleDone = () => {
      addRideOffer({ departure: departure, destination: dest, fuelPrice: fuel_price });
      navigation.navigate('Passenger'); 
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
        label="Departure"
        value={departure}
        onChangeText={(departure) => setDeparture(departure)}
        mode="outlined"
      />

      <TextInput
        label="Destination"
        value={dest}
        onChangeText={dest => setDest(dest)}
        mode='outlined'
      />

      <TextInput
          label="Fuel Price"
          value={fuel_price}
          onChangeText={fuel_price => setFuelPrice(fuel_price)}
          mode='outlined'
      />

      <View style={{ marginTop: 20 }}>
        <CreateButton text='Done' onPress={handleDone} />
      </View>

      </View>
    );
}

export default CreateRideOfferScreen