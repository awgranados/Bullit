import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CreateButton, IconButton} from 'app/app/button';

export default function PassengerScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text
                onPress ={() => navigation.navigate('Home')}
                style = {styles.text}>Passenger Screen</Text>
                <CreateButton text='Create Ride Request' /*onPress={}*//>
                <CreateButton text='Give rating' /*onPress={}*//>
                <IconButton text="chatbubble-ellipses-outline" /*onPress={}*//>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#002E5D",
    },
});