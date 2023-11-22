import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, Image, Appearance} from 'react-native';
import {CreateButton} from 'app/app/button';



const user = userCredential.user;
export default function ProfileScreen({navigation}) {
    return(
        
        <View style = {styles.container}>    

            <Text style = {styles.header}>John Doe</Text>
            <Text style = {styles.text}>Male, 20</Text>   
            <Text style = {styles.text}>Passenger Rating: 4.5</Text>  
            <Text style = {styles.text}>Total Rides: 4</Text>                    
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
    header: {
        fontSize: 35,
        fontWeight: "bold", 
        padding: 10, 
        color: '#002E5D'
    },
    text: {
        fontSize: 20,
        fontWeight: "bold", 
        padding: 3, 
        color: '#002E5D'
    },
    
});