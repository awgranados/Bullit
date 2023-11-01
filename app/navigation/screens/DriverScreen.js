import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CreateButton} from 'app/app/button';

import { Avatar, Button, Card } from 'react-native-paper';

export default function DriverScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text
                onPress ={() => navigation.navigate('Home')}
                style = {styles.text}>Driver Screen
            </Text>

            <CreateButton text='Create Ride Offer' onPress ={() => navigation.navigate('CreateRideOffer')}/>
            
            <Card style={styles.card}>
                <Card.Title title="Ride 1" titleStyle={styles.text3} subtitle="Destination: San Francisco" subtitleStyle={styles.text3} />
                <Card.Content>
                <Text variant="titleLarge" style={styles.text3}>Total distance: 330 mi</Text>
                <Text variant="bodyMedium" style={styles.text3}>Fuel price: Regular $7.00</Text>
                </Card.Content>
                <Card.Actions>
                <Button onPress ={() => navigation.navigate('Home')} style={styles.button}><Text style={styles.text3}>Accept Ride</Text></Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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