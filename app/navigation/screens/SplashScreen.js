import React, {Component, component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";

export default class Splash extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#002E5D',
                }}
            >
                <LottieView
                    source={require('../../assets/Animation 1.json')}
                    autoPlay
                    loop={false}
                    speed={1}
                    onAnimationFinish={() => {
                        console.log('Animation Finished!');
                        this.props.navigation.replace('Login');
                    }}
                    onError={(error) => {
                      console.error("Lottie Error: ", error);
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width, // Take up the full screen width
        height: Dimensions.get('window').height, // Take up the full screen height
    },
});