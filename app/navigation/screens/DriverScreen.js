import * as React from 'react';
import {View, Text} from 'react-native';
import {CreateButton} from 'app/app/button';

export default function DriverScreen({navigation}) {
    return(
        <View style={{flex : 1, alignItems: 'center' , justifyCenter: 'center' }}>
            <Text
                onPress ={() => navigation.navigate('Home')}
                style = {{fontSize : 26, fontWeight: 'bold'}}>Driver Screen</Text>
                <CreateButton text='Create Ride Offer' /*onPress={}*//>
        </View>
    );
}