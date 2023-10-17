import { SafeAreaView, View, Text} from 'react-native';

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
            </View>
        </SafeAreaView>
    )
}

export default Home;