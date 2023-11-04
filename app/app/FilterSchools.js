import { StyleSheet, Text, TextInput, View } from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import {Searchbar} from 'react-native-paper'


const FilterSchools = () => {
    const navigation = useNavigation();
    const [userInput, setUserInput] = useState("");
    const schools = [
        {
            id: 1,
            name: "University of California, Santa Barbara",
        },
        {
            id: 2,
            name: "University of California, Los Angeles",
        },
        {
            id: 3,
            name: "University of California, Berkeley",
        },
        {
            id: 4,
            name: "University of California, Davis",
        },
        {
            id: 5,
            name: "University of California, San Diego",
        },
    ];

    const filterData = (item) =>{
        const schoolName = item.name;
        if (userInput === ""){
            <View style={styles.itemContainer}>
                <Text
                    onPress={() => navigation.navigate('RideList', {schoolName})}
                    >{item.name}</Text>
            </View>;
        }

        if(item.name.toLowerCase().includes(userInput.toLowerCase())) {
            return(
                <View style={styles.itemContainer}>
                    <Text
                        onPress={() => navigation.navigate('RideList', {school: schoolName})}
                        >{item.name}</Text>
                </View>
            );
        }
    };
    return (
        <View>
            <SafeAreaView />
            <View>
                <Searchbar placeholder="enter your search" onChangeText = {(text)=> setUserInput(text)}/>
            </View>

            <FlatList 
                data ={schools} 
                renderItem  = {({item, index})=> filterData(item)} 
            />
        </View>
    );
};


export default FilterSchools;


const styles = StyleSheet.create({
    textInputContainer: {
        borderColor: "orange",
        borderWidth: 2,
        paddingHorizontal: 36,
        paddingVertical: 8,
        borderRadius: 6,
        marginHorizontal: 16,
    },


    itemContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        marginHorizontal: 16,
        backgroundColor: "#ebf5fb",
        paddingHorizontal: 36,
        paddingVertical: 16,
        borderRadius: 6,
    },
});
