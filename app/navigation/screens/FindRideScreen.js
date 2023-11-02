import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FilterSchools from '../../app/FilterSchools';

export default function FindRideScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <FilterSchools />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
    },
});
