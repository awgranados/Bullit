// CreateRideOfferScreen.js
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native'
import * as React from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { CreateButton } from 'app/app/button';
import RideContext from '../context/RideContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateRideOfferScreen = () => {
    const [dest, setDest] = React.useState("");
    const [fuel_price, setFuelPrice] = React.useState("");
    const [departure, setDeparture] = React.useState("");
    const [departureDate, setDepartureDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [seats, setSeats] = React.useState(4);

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
        Alert.alert("Invalid Input", "Please select UCSB. Currently, we only support departure from UCSB.");
        return; // Return early to prevent further execution
      }

      addRideOffer({ departure: departure, destination: dest, fuelPrice: fuel_price });
      navigation.navigate('DriverPage'); 
    };
    
    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || departureDate;
      setShowDatePicker(true);
    };

    const showDatepicker = () => {
      setShowDatePicker(true);
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
      <Text style={styles.label}>Departure</Text>
      <GooglePlacesAutocomplete
          placeholder='Currently, only allows departure from UCSB'
          fetchDetails={true}
          onPress={(data, details = null) => {
              // Set departure to "University of California, Santa Barbara" if it matches
              if (data.description === UCSB) {
                  setDeparture(data.description);
              }
          }}
          query={{
              key: 'AIzaSyD5s29CI_yIZQyR2TsfucfAtVpZCLMINcs',
              language: 'en',
              components: "country:us",
              types: 'establishment'
              // You might want to specify a region or location type if applicable
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

      <Text style={styles.label}>Destination</Text>
      <GooglePlacesAutocomplete
        placeholder='Please enter a city'
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
          textInput: styles.input // Apply the same style as your TextInput
        }}
      />
      <Button onPress={showDatepicker} title="Choose Departure Date and Time" />
        {showDatePicker && (
          <DateTimePicker
              testID="dateTimePicker"
              value={departureDate}
              mode={'datetime'}
              is24Hour={true}
              display="default"
              onChange={onDateChange}
              alignSelf='center'
          />
        )}

      <Text style={styles.label}>Seats Available</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setSeats(text)}
            value={seats}
            placeholder="Enter the number of seats"
            keyboardType="numeric"
        />

              

      <Text style={styles.label}>Trip Cost</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFuelPrice}
        value={fuel_price}
        placeholder="Please enter a trip cost between $0 and $1000"
        keyboardType="numeric"
      />

      <View style={{ marginTop: 20 }}>
        <CreateButton text='Done' onPress={handleDone} />
      </View>

      </View>
    );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left', 
  },
  input: {
    height: 50, // Set the height to match Google Places Autocomplete
    marginVertical: 8, // Adjust vertical margin as needed
    paddingHorizontal: 10, // Horizontal padding
    borderWidth: 1, // Border width
    borderColor: '#BDBDBD', // Border color to match Google Places Autocomplete's border
    borderRadius: 5, // Border radius
    fontSize: 16, // Font size
    color: '#424242', // Text color
    backgroundColor: '#ffffff',
    textAlign: 'left',
  },
  datePickerContainer: {
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  button: {
    textAlign: 'left', // Align text to the left
  },
});

export default CreateRideOfferScreen
