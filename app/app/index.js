import { SafeAreaView, View, Text} from 'react-native';
import LoginButton from './button';

const Home = () => {
    return (
        <SafeAreaView>
            <View
                style={{
                    justifyContent: 'center',
                    height: '100%',
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>
                    Hello World
                </Text>
                <LoginButton text='login' /*onPress={}*//>
            </View>
        </SafeAreaView>
    )
}

export default Home;