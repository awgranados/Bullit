import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {CreateButton, IconButton} from 'app/app/button';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({navigation}) {
    return(
        <View style = {styles.container}>     
            <Image source={require("app/app/defaultpfp.webp")} style={{width: 140, height: 140, borderRadius: 100, marginTop: -70}}>
            </Image>         
            <Text style = {{fontSize: 25, fontWeight: "bold", padding: 10, color: '#002E5D'}}>John Doe</Text>
            <Text style = {{fontSize: 20, fontWeight: "bold", padding: 10, color: '#002E5D'}}>Male, 20</Text>   
            <Text style = {{fontSize: 20, fontWeight: "bold", padding: 10, color: '#002E5D'}}>Passenger Rating: 4.5</Text>  
            <Text style = {{fontSize: 20, fontWeight: "bold", padding: 10, color: '#002E5D'}}>Total Rides: 4</Text>                    
            <CreateButton text='Edit Profile'/*onPress={}*/ />
            <CreateButton text='Logout' /*onPress={}*//>
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