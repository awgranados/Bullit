import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function PassengerScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text
                onPress ={() => navigation.navigate('Home')}
                style = {styles.text}>Passenger Screen</Text>
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