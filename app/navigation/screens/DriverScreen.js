import * as React from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Modal} from 'react-native';
import {CreateButton} from 'app/app/button';
import RideContext from '../context/RideContext';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { FontAwesome } from '@expo/vector-icons';

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
    const [destination, setDestination] = React.useState("");
    const [searchIconColor, setSearchIconColor] = React.useState("#c4c4c4");
    const [searchBoxColor, setSearchBoxColor] = React.useState("#c4c4c4")

    const autocompleteRef = React.useRef(null);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [cardDestination, setCardDestination] = React.useState("");
    const [cardDate, setCardDate] = React.useState("");
    const [cardOffer, setCardOffer] = React.useState();



    const handleAcceptPress = (newCardDestination, newCardDate, offer) => {
        setCardDestination(newCardDestination);
        setCardDate(newCardDate);
        setCardOffer(offer);
        toggleModal();
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleSearchClear = (text) => {
        if (text === ""){
            setDestination("");
        }
    };

    const handleSearchFocus = () => {
        setSearchIconColor("#012d5c");
        setSearchBoxColor("#012d5c");

      };

    const handleSearchBlur = () => {
        setSearchIconColor("#c4c4c4")
        setSearchBoxColor("#c4c4c4");
    };

    let resultsCount = 0;

    return(
            <View  style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <Text
                        style = {styles.text}>Let's find you a ride!
                    </Text>
                </View>

                <View style={{padding:20, flexDirection:'column', gap:10}}>
                    <View style={{flexDirection: "row", gap: -1, borderWidth: 2, borderRadius: 8, borderColor: searchBoxColor, width: "98%"}}>
                        <FontAwesome name="search" size={21} color={searchIconColor} style={{marginTop: 13, paddingLeft: 12}} />
                        <GooglePlacesAutocomplete
                        placeholder="Where are you going?"
                        fetchDetails={true}
                        GooglePlacesSearchQuery={{
                            rankby: "distance"
                        }}
                        onPress={(data, details = null) => {
                            setDestination(data.description);
                        }}
                        textInputProps={{
                            InputComp: TextInput,
                            onChangeText: (text) => handleSearchClear(text),
                            onFocus: handleSearchFocus,
                            onBlur: handleSearchBlur,
                            placeholderTextColor: searchIconColor,
                        }}
                        enablePoweredByContainer={false}
                        ref={autocompleteRef}
                        onChagneText={()=>handleSearchFocus}
                        query={{
                            key: "AIzaSyD5s29CI_yIZQyR2TsfucfAtVpZCLMINcs",
                            language: "en",
                            components: "country:us",
                            types: "(cities)",
                            radius: 30000,
                            location: `${region.latitude}, ${region.longitude}`
                        }}
                        styles={{
                            container: { flex: 0, width: "90%", zIndex: 1, paddingTop: 3.5 },
                            listView: { backgroundColor: "black" },
                        }}
                        />
                    </View>
                    <ScrollView style={styles.list}>
                    {rideOffers.map((offers, index) => {
                    const destinationForCard = offers.destination;
                    const departureDate = offers.departureTime.toDate();
                    const passengersUserUID = offers.passengersUserUID;
                    const driverUserUID = offers.driverUserUID;
                    const offerDestination = offers.destination;
                    const seatsTaken = offers.seatsTaken;
                    const seatsAvailable = offers.seatsAvailable;
                    let showOffer = true;
                    
                    
                    
                        
                    if (passengersUserUID){
                        for (const passenger of passengersUserUID) {
                            if (user.uid === passenger) showOffer = false;
                        }
                    }
                    if (driverUserUID){
                        if (user.uid === driverUserUID) showOffer = false;
                    }
                    if (seatsTaken === seatsAvailable) showOffer = false;
                    
                    if (destination !== "") {
                        if (destination) {
                            if (destination !== offerDestination){
                                showOffer = false;
                            }
                            else {
                                if (showOffer) resultsCount++;
                            }
                        }
                        
                     }
                     

                    const options = {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                    };

                    const formattedDate = departureDate.toLocaleDateString('en-US', options);
                    if (index == (rideOffers.length - 1) && resultsCount === 0 && destination.length != 0) return (<Text key={index} style={{ fontSize: 16, fontWeight: "600", marginTop: 20, textAlign: "center"}}>No rides found.</Text>)
                    else
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
                            <Button onPress={() => handleAcceptPress(destinationForCard.split(',')[0] + ", " + destinationForCard.split(',')[1], formattedDate, offers)}  style={styles.button}><Text style={styles.text3}>Accept Ride</Text></Button>
                        </Card.Actions>
                        </Card>)
                    );
                    })}</ScrollView>
                    <Modal visible={isModalVisible} animationType="slide">
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeader}>Do you want to accept this ride?</Text>
                            <Text style={styles.modalText} >{cardDestination}</Text>
                            <Text style={styles.modalText}>{cardDate}</Text>
                            <View style={{height:20}}></View>
                            <CreateButton onPress={() => {
                                acceptRide(cardOffer.id)
                                toggleModal()
                                }} text="Confirm" />
                            <View style={{height:20}}></View>
                            <CreateButton text="Cancel" onPress={toggleModal} />
                        </View>
                    </Modal>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 52,
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#00366e",
        marginTop: 36,
        marginBottom: 6
    },
    card: {
        backgroundColor: '#002E5D',
        marginBottom: 10
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
    list: {
        flexDirection:'column',
        gap:10,
        marginBottom: 120
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    modalHeader: {
        fontFamily:"Montserrat-SemiBold",
        fontSize: 17,
        marginBottom: 40
    },
    modalText: {
        fontFamily: "Montserrat-Medium",
        fontSize: 17,
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 4,
        padding: 4,
        marginBottom: 8
    }
});

