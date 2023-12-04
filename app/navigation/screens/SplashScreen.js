import React, {Component, component } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import FastImage from 'react-native-fast-image';
import { Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          timer: null,
        };
    }

    componentDidMount() {
        // Set a timer for the GIF duration
        this.setState({
          timer: setTimeout(() => {
            this.props.navigation.replace('Login');
          }, 3000) // Set this to your GIF's duration
        });
    }

    componentWillUnmount() {
        // Clear the timer when the component is unmounted
        if (this.state.timer) {
          clearTimeout(this.state.timer);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* this has trouble on expo :
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

                    -----

                    <Image
                source={require('../../assets/Animation1.gif')} 
                style={styles.image}
                onLoadEnd={() => this.props.navigation.replace('Login')} // Navigate when the GIF is loaded
              />
                />
                */}
                <Image
                    source={require('../../assets/Animation1.gif')} // Make sure the path is correct
                    style={styles.image}
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
        backgroundColor: '#002E5D',
        width: Dimensions.get('window').width, // Take up the full screen width
        height: Dimensions.get('window').height, // Take up the full screen height
    },
    image: {
        width: 150, 
        height: 150, 
    },
});