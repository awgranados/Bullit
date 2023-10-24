import * as React from 'react';
import LoginButton from 'app/app/button';
import {View, Text, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text
                onPress ={() => alert('Home Screen')}
                style = {styles.text}>Home Screen</Text>
                <LoginButton text='login' /*onPress={}*//>
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