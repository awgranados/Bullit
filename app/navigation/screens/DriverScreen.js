import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CreateButton} from 'app/app/button';
import RideContext from '../context/RideContext';

import { Avatar, Button, Card } from 'react-native-paper';

export default function DriverScreen({navigation}) {
    const { rideRequests } = React.useContext(RideContext);

    return(
        <View style={styles.container}>
            <View style={{alignItems:'center'}}>
            <Text
                style = {styles.text}>Driver Screen
            </Text>
            </View>

        <View style={{padding:20, flexDirection:'column', gap:10}}>
            <CreateButton text='Create Ride Offer' onPress ={() => navigation.navigate('CreateRideOffer')}/>
            
            { rideRequests.map((requests, index) => (
                <Card key={index} style={styles.card}>
                <Card.Title title={`Ride ${index + 1}`} titleStyle={styles.text3} subtitle={`Destination: ${requests.destination}`} subtitleStyle={styles.text3} />
                <Card.Content>
                    <Text variant="titleLarge" style={styles.text3}>Departure: {requests.departure} </Text>
                    <Text variant="titleLarge" style={styles.text3}>Total distance:</Text>
                    <Text variant="bodyMedium" style={styles.text3}>Desired Fuel price: {requests.fuelPrice} $</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress ={() => navigation.navigate('Home')} style={styles.button}><Text style={styles.text3}>Accept Ride</Text></Button>
                </Card.Actions>
                </Card>
            ))
            }
        </View>
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

