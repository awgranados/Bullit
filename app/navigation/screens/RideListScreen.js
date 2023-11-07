import React from 'react';
import { View, Text } from 'react-native';


const RideListScreen = ({ route }) => {
    const { school } = route.params;
    console.log(school)
    return (
        <View>
        <Text>List of Ride Offers</Text>
        <Text>{school}</Text>
        {/* Add more details about the suggestion as needed */}
        </View>
    );
};


export default RideListScreen;