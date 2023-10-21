import * as React from 'react';
import LoginButton from 'app/app/button';
import {View, Text} from 'react-native';

export default function HomeScreen({navigation}) {
    return(
        <View style={{flex : 1, alignItems: 'center' , justifyCenter: 'center' }}>
            <Text
                onPress ={() => alert('Home Screen')}
                style = {{fontSize : 26, fontWeight: 'bold'}}>Home Screen</Text>
                <LoginButton text='login' /*onPress={}*//>
        </View>
        
    );
}