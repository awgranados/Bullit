import * as React from 'react';
import {View, Text} from 'react-native';

export default function DriverScreen({navigation}) {
    return(
        <View style={{flex : 1, alignItems: 'center' , justifyCenter: 'center' }}>
            <Text
                onPress ={() => navigation.navigate('Home')}
                style = {{fontSize : 26, fontWeight: 'bold'}}>Driver Screen</Text>
        </View>
    );
}