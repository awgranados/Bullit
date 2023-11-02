import React from 'react';
import { StyleSheet } from 'react-native';
const darkMode = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#121212",
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
})

export default darkMode;