import MainContainer from '../navigation/MainContainer';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';

const Home = () => {
    return (
        <SafeAreaProvider style={styles.container}>
            <MainContainer/>
        </SafeAreaProvider>
    )
}

const insets = useSafeAreaInsets();
const styles = StyleSheet.create({ 
    style:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',

        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }
}); 

export default Home;