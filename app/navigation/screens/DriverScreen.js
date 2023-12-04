import * as React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {CreateButton} from 'app/app/button';
import RideContext from '../context/RideContext';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import { Avatar, Button, Card } from 'react-native-paper';
import acceptRide from '../actions/acceptRide';
import auth from "../../app/firebaseConfig";

export default function DriverScreen({navigation}) {
    const [ region, setRegion ] = React.useState({
        latitude: 34.413963,
        longitude: -119.848946,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    const { rideOffers } = React.useContext(RideContext);
    const user = auth.currentUser;

    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={{alignItems:'center'}}>
                <Text
                    style = {styles.text}>Driver Screen
                </Text>
            </View>

            <View style={{padding:20, flexDirection:'column', gap:10}}>
                <CreateButton text='Create Ride Offer' onPress ={() => navigation.navigate('CreateRideOffer')}/>
                
                <GooglePlacesAutocomplete
                placeholder="Search for Destination"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    console.log(data['description'])
                            const location_name = data['description']
                            console.log(location_name)
                            navigation.navigate('RideList', {school: location_name})
                }}
                query={{
                    key: "AIzaSyD5s29CI_yIZQyR2TsfucfAtVpZCLMINcs",
                    language: "en",
                    components: "country:us",
                    types: "establishment",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: { flex: 0, width: "100%", zIndex: 1 },
                    listView: { backgroundColor: "black" }
                }}
                />

                {rideOffers.map((offers, index) => {
                const departureDate = offers.departureTime.toDate();
                const passengersUserUID = offers.passengersUserUID;
                let showOffer = true;
                    
                if (passengersUserUID){
                    for (const passenger of passengersUserUID) {
                        if (user.uid === passenger) showOffer = false;
                    }
                }

                const options = {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                };

                const formattedDate = departureDate.toLocaleDateString('en-US', options);

                return (
                    showOffer && 
                    (<Card key={index} style={styles.card}>
                    <Card.Title title={`Destination: ${offers.destination}`} titleStyle={styles.text3} />
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.text3}>
                        {formattedDate}
                        </Text>
                        <Text variant="titleLarge" style={styles.text3}>Departure: {offers.departure} </Text>
                        <Text variant="titleLarge" style={styles.text3}>Seats Taken: {offers.seatsTaken} / {offers.seatsAvailable}</Text>
                        <Text variant="bodyMedium" style={styles.text3}>Seat Price: ${offers.seatPrice}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => acceptRide(offers.id)} style={styles.button}><Text style={styles.text3}>Accept Ride</Text></Button>
                    </Card.Actions>
                    </Card>)
                );
                })}
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#002E5D",
    },
    card: {
        backgroundColor: '#002E5D',
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#002E5D",
    },
    text3: {
        color: "#FFFFFF",
    },
    button: {
        backgroundColor: '#FF4618',
    },
});

