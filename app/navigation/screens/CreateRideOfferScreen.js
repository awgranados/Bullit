import { View, Text, Button, Alert, TextInput, StyleSheet } from 'react-native'
import * as React from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { CreateButton } from 'app/app/button';
import RideContext from '../context/RideContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const CreateRideOfferScreen = () => {
    const [dest, setDest] = React.useState("");
    const [fuel_price, setFuelPrice] = React.useState("");
    const [departure, setDeparture] = React.useState("");

    const navigation = useNavigation();

    const { addRideOffer } = React.useContext(RideContext);

    const UCSB = "University of California, Santa Barbara, Santa Barbara, CA, USA";

    const handleDone = () => {
      const fuelPriceNum = parseFloat(fuel_price);
      if (isNaN(fuelPriceNum) || fuelPriceNum < 0 || fuelPriceNum > 1000) {
          Alert.alert("Invalid Input", "Please enter a fuel price between 0.00 and 1000.00");
          return;
      }

      if (departure !== UCSB) {
        Alert.alert("Invalid Input", "We currently only allow rides depature from UCSB.");
        return; // Return early to prevent further execution
      }

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
    <View style={{padding:16, flexDirection:'column', gap:10}}>
      <GooglePlacesAutocomplete
            placeholder='Departure'
            fetchDetails={true}
            onPress={(data, details = null) => {
                // Set departure to "University of California, Santa Barbara" if it matches
                if (data.description === "University of California, Santa Barbara, Santa Barbara, CA, USA") {
                    setDeparture(data.description);
                }
            }}
            query={{
                key: 'AIzaSyD5s29CI_yIZQyR2TsfucfAtVpZCLMINcs',
                language: 'en',
                components: "country:us",
                types:'establishment'
            }}
            styles={{
                container: { flex: 0, width: "100%", zIndex: 1 },
                listView: { backgroundColor: "black" },
                textInput: styles.input // Apply your custom input style
            }}
            onFail={(error) => console.error(error)}
            filterReverseGeocodingByTypes={['establishment']}
            predefinedPlaces={[{
                description: 'University of California, Santa Barbara, Santa Barbara, CA, USA',
                geometry: { location: { lat: 34.4133, lng: -119.8610 } }
            }]}
        />

      <GooglePlacesAutocomplete
          placeholder='Destination'
          fetchDetails={true}
          onPress={(data, details = null) => {
            setDest(data.description);
          }}
          query={{
            key: 'AIzaSyD5s29CI_yIZQyR2TsfucfAtVpZCLMINcs',
            language: 'en',
            components: "country:us",
            types: '(cities)' // restrict search to cities only
          }}
          styles={{
            container: { flex: 0, width: "100%", zIndex: 1 },
            listView: { backgroundColor: "black" },
            textInput: styles.input
          }}
        />

      <TextInput
          style={styles.input}
          onChangeText={fuel_price => setFuelPrice(fuel_price)}
          value={fuel_price}
          placeholder="Fuel Price"
          keyboardType="numeric"
      />

      <View style={{ marginTop: 20 }}>
        <CreateButton text='Done' onPress={handleDone} />
      </View>

      </View>
    );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: 16,
    color: '#424242',
  },
});

export default CreateRideOfferScreen