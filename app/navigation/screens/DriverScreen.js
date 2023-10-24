import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CreateButton} from 'app/app/button';

export default function DriverScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text
                onPress ={() => navigation.navigate('Home')}
                style = {styles.text}>Driver Screen</Text>
                <CreateButton text='Create Ride Offer' /*onPress={}*//>
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