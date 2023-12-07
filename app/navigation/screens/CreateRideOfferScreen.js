// CreateRideOfferScreen.js
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native'
import * as React from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { CreateButton } from 'app/app/button';
import RideContext from '../context/RideContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getTripDuration } from '../actions/getTripDuration';
import { Timestamp } from "firebase/firestore";
import auth from "../../app/firebaseConfig";

const CreateRideOfferScreen = () => {
    const [dest, setDest] = React.useState("");
    const [fuel_price, setFuelPrice] = React.useState("");
    const [departure, setDeparture] = React.useState("");
    const [destCoord, setDestCoord] = React.useState();
    const [departureCoord, setDepartureCoord] = React.useState([34.4133, -119.8610]);
    const [departureDate, setDepartureDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [seats, setSeats] = React.useState(4);
    const user = auth.currentUser;

    const navigation = useNavigation();

    const { addRideOffer } = React.useContext(RideContext);
    
    const UCSB = "University of California, Santa Barbara, Santa Barbara, CA, USA";

    const handleDone = async () => {
      const fuelPriceNum = parseFloat(fuel_price);
      if (isNaN(fuelPriceNum) || fuelPriceNum < 0 || fuelPriceNum > 1000) {
          Alert.alert("Invalid Input", "Please enter a fuel price between 0.00 and 1000.00");
          return;
      }

      if (departure !== UCSB) {
        Alert.alert("Invalid Input", "Please select UCSB. Currently, we only support departure from UCSB.");
        return; // Return early to prevent further execution
      }

      let arrivalTime = new Date();
      let tripDistance = 0;

      try{
        const trip = await getTripDuration(departureCoord, destCoord);
        //Calculate Arrival Time
        arrivalTime = new Date(departureDate.getTime() + trip.duration * 1000);
        //trip distance
        tripDistance = trip.distance;
      } catch(error){
        console.error("Error in try", error);
      }


      addRideOffer({ 
        createdOn: Timestamp.now(),
        departureCoord: departureCoord,
        departure: departure,
        departureTime: Timestamp.fromDate(departureDate),
        destinationCoord: destCoord,
        destination: dest,
        arrivalTime: Timestamp.fromDate(arrivalTime),
        tripDistance: tripDistance,
        totalPrice: fuel_price,
        seatsAvailable: seats,
        seatsTaken: 0,
        seatPrice: fuel_price,
        driverUserUID: user.uid,
       });
      navigation.navigate('HomePage'); 
    };
    
    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || departureDate;
      setDepartureDate(currentDate);
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
          setDestCoord([details.geometry.location.lat, details.geometry.location.lng])
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
            value={seats.toString()}
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
