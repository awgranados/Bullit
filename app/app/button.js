import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function LoginButton({ text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.loginbutton}>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

export function CreateButton({ text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.createbutton}>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loginbutton: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#2196F3',
        width: 150,
        height: 50,
        alignSelf: 'center'
    },
    createbutton: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#2196F3',
        width: 250,
        height: 50,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
})