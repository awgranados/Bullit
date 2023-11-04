import * as React from 'react';
import LoginButton from 'app/app/button';
import {View, Text, StyleSheet} from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';

import RideContext from '../context/RideContext';

export default function HomeScreen({navigation}) {
    const { rideRequests } = React.useContext(RideContext);
    const { rideOffers } = React.useContext(RideContext);

    return(
        <View style={styles.container}>
            <View style={{alignItems:'center'}}>
            <Text
                style = {styles.text}>Home Screen
            </Text>
            </View>

            <View style={{padding:20, flexDirection:'column', gap:10}}>
            <Text
                style = {styles.text2}>Posted Ride Requests
            </Text>
            {
            rideRequests.map((requests, index) => (
                <Card key={index} style={styles.card}>
                <Card.Title title={`Ride ${index + 1}`} titleStyle={styles.text3} subtitle={`Destination: ${requests.destination}`} subtitleStyle={styles.text3} />
                <Card.Content>
                    <Text variant="titleLarge" style={styles.text3}>Total distance:</Text>
                    <Text variant="bodyMedium" style={styles.text3}>Desired Fuel price: {requests.fuelPrice} $</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress ={() => navigation.navigate('Home')} style={styles.button}><Text style={styles.text3}>Cancel Ride</Text></Button>
                </Card.Actions>
                </Card>
            ))
            }
        </View>

        <View style={{padding:20, flexDirection:'column', gap:10}}>
            <Text
                style = {styles.text2}>Posted Rides Offers
            </Text>
            {
            rideOffers.map((offer, index) => (
                <Card key={index} style={styles.card}>
                <Card.Title title={`Ride ${index + 1}`} titleStyle={styles.text3} subtitle={`Destination: ${offer.destination}`} subtitleStyle={styles.text3} />
                <Card.Content>
                    <Text variant="titleLarge" style={styles.text3}>Total distance:</Text>
                    <Text variant="bodyMedium" style={styles.text3}>Fuel price: {offer.fuelPrice} $</Text>
                    <Text variant="bodyMedium" style={styles.text3}>Vehicle Model:</Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress ={() => navigation.navigate('Home')} style={styles.button}><Text style={styles.text3}>Cancel Ride</Text></Button>
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
    card: {
        backgroundColor: '#002E5D',
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#002E5D",
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