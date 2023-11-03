import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CreateButton, IconButton} from 'app/app/button';
import { Avatar, Button, Card } from 'react-native-paper';
import RideContext from '../context/RideContext';


export default function PassengerScreen({navigation}) {
    const { rideOffers } = React.useContext(RideContext);
    
    return(
        <View style={styles.container}>
            <Text
                onPress ={() => navigation.navigate('Home')}
                style = {styles.text}>Passenger Screen</Text>
                <CreateButton text='Create Ride Request' onPress ={() => navigation.navigate('CreateRideRequest')}/>

            {
            rideOffers.map((offer, index) => (
                <Card key={index} style={styles.card}>
                <Card.Title title={`Ride ${index + 1}`} titleStyle={styles.text3} subtitle={`Destination: ${offer.destination}`} subtitleStyle={styles.text3} />
                <Card.Content>
                    <Text variant="titleLarge" style={styles.text3}>Total distance:</Text>
                    <Text variant="bodyMedium" style={styles.text3}>Fuel price: Regular {offer.fuelPrice} </Text>
                    <Text variant="bodyMedium" style={styles.text3}>Vehicle Model:</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress ={() => navigation.navigate('Home')} style={styles.button}><Text style={styles.text3}>Accept Ride</Text></Button>
                </Card.Actions>
                </Card>
            ))
            }
        </View>
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