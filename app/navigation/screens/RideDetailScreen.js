import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import * as React from 'react';
import { List, MD3Colors, TextInput, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import { CreateButton } from 'app/app/button';
import Entypo from "react-native-vector-icons/Entypo";

const RideDetailScreen = ({ route }) => {
    const { rideDetails } = route.params;
    {/* SUBSTITUTE */}
    const cancelRide = () => {
        console.log('here');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white', paddingVertical: 10, alignItems: 'center', margin: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Route Info</Text>
                </View>
                <Card style={styles.card}>
                    <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 16}}>
                            {/* SUBSTITUTE */}
                            <Title style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold', color:"white"}}>{"10:00"}</Title>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'left', fontSize: 20, color:"white" }}>{"AM"}</Paragraph>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'left', fontSize: 15, color:"white" }}>{"UCSB"}</Paragraph>
                        </View>
                        <View>
                            <Entypo name={"flow-line"} size={100} color={"white"} style={{ transform: [{ rotate: '90deg' }], marginTop: -40 }} />
                            <Paragraph  style={{ textAlign: 'center', fontSize: 15, color:"white", marginTop: -30 }}>{"6H 00M"}</Paragraph>
                            <Paragraph  style={{ textAlign: 'center', fontSize: 15, color:"white" }}>{"330 mi"}</Paragraph>
                        </View>
                        <View style={{ marginLeft: 'auto' }}>
                            {/* SUBSTITUTE */}
                            <Title style={{textAlign: 'right', fontSize: 30, fontWeight: 'bold', color:"white"}}>{"5:00"}</Title>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'right', fontSize: 20, color:"white" }}>{"PM"}</Paragraph>
                            <Paragraph  style={{ textAlign: 'right', fontSize: 15, color:"white" }}>{rideDetails.destination && rideDetails.destination.split(',')[0]}</Paragraph>
                        </View>
                    </Card.Content>
                </Card>
                <View style={{ backgroundColor: 'white', padding: 10, alignItems: 'center', margin: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Driver Info</Text>
                </View>
                <Card style={styles.card}>
                    <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 16}}>
                            {/* SUBSTITUTE */}
                            {/* <Avatar.Image size={80} source={require('./path/to/your/image.jpg')} /> */}
                            <Avatar.Image size={80} />
                        </View>
                        <View>
                            {/* SUBSTITUTE */}
                            <Title style={{fontSize: 30, fontWeight: 'bold', color:"white"}}>{"John S."}</Title>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'left', fontSize: 15, color:"white" }}>{"Rating: 4.5"}</Paragraph>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'left', fontSize: 15, color:"white" }}>{"Vehicle Model: "}</Paragraph>
                        </View>
                        <View>
                            <Entypo name={"star"} size={20} color={"white"} style={{ marginLeft: -35, marginTop: 9 }} />
                        </View>
                    </Card.Content>
                </Card>
                <View style={{ backgroundColor: 'white', paddingVertical: 10, alignItems: 'center', margin: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Receipt</Text>
                </View>
                <Card style={styles.card}>
                    <Card.Content style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'center', fontSize: 15, color:"white" }}>{"1 seat(s) x $20.00 ............... $20.00"}</Paragraph>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'center', fontSize: 15, color:"white" }}>{"Service Fees x $5 ............... $5.00"}</Paragraph>
                        </View>
                        <Card style={styles.card2}>
                            <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Paragraph  style={{fontWeight: 'bold', textAlign: 'left', fontSize: 20, color:"black" }}>{"Total"}</Paragraph>
                                </View>
                                <View style={{ marginLeft: 'auto' }}>
                                    {/* SUBSTITUTE */}
                                    <Paragraph  style={{fontWeight: 'bold', textAlign: 'right', fontSize: 20, color:"black" }}>{"$25.00"}</Paragraph>
                                </View>
                            </Card.Content>
                        </Card>
                    </Card.Content>
                </Card>

                <TouchableOpacity onPress={cancelRide}>
                    <Card style={styles.card3}>
                        <Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <View>
                                <Paragraph  style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20, color:"white" }}>{"CANCEL RIDE"}</Paragraph>
                            </View>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>


            </View>
        </ScrollView>
    )
};

export default RideDetailScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: "#D3D3D3",
    },
    card: {
        backgroundColor: '#002E5D',
        width: 350,
        marginHorizontal: 30,
        padding: 10,
        borderRadius: 10,
    },
    card2: {
        backgroundColor: '#FFFFFF',
        width: 300,
        margin: 10,
        borderRadius: 5,
    },
    card3: {
        backgroundColor: '#D30000',
        margin: 16,
        width: 250,
        marginTop: 30,
        borderRadius: 5,
        alignSelf: 'center',
    },
});