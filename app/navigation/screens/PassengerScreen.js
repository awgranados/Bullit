import * as React from 'react';
import {View, Text} from 'react-native';

export default function PassengerScreen({navigation}) {
    return(
        <View style={{flex : 1, alignItems: 'center' , justifyCenter: 'center' }}>
            <Text
                onPress ={() => navigation.navigate('Home')}
                style = {{fontSize : 26, fontWeight: 'bold'}}>Passenger Screen</Text>
        </View>
    );
}
