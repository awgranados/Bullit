import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

export function IconButton({ text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconbutton}>
                <Ionicons name ={text} size={42} color="#FFFFFF"/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loginbutton: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#FF4618',
        width: 150,
        height: 50,
        alignSelf: 'center'
    },
    createbutton: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#FF4618',
        width: 220,
        height: 46,
        alignSelf: 'center'
    },
    iconbutton: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: '#FF4618',
        width: 60,
        height: 60,
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