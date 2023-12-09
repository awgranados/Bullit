import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import * as React from 'react';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import Entypo from "react-native-vector-icons/Entypo";
import { getUserDetails } from '../actions/getUserDetails';

const DriversRideDetailScreen = ({ route }) => {
    const [tripDistance, setTripDistance] = React.useState(0);
    const [driverDetails, setDriverDetails] = React.useState()
    const { rideDetails } = route.params;

    React.useEffect(() => {
        const fetchDriverDetails = async () => {
            //retrieve driver details
            let newDriverDetails = await getUserDetails(rideDetails.driverUserUID);
            setDriverDetails(newDriverDetails);
        }
        fetchDriverDetails();
    }, [])

    const departureDate = rideDetails.departureTime.toDate();
    const departureTime = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).slice(0, -3);
    const departureTimeAMPM = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).slice(-2);
    const arrivalDate = rideDetails.arrivalTime.toDate();
    const arrivalTime = arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).slice(0, -3);
    const arrivalTimeAMPM = arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).slice(-2);
    // Calculate the time difference in milliseconds
    const timeDifferenceInMillis = arrivalDate - departureDate;

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifferenceInMillis % (1000 * 60 * 60)) / (1000 * 60));


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white', paddingVertical: 10, alignItems: 'center', margin: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Route Info</Text>
                </View>
                <Card style={styles.card}>
                    <Card.Content style={{flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{marginRight: 16}}>
                            {/* SUBSTITUTE */}
                            <Title style={{textAlign: 'left', fontSize: 30, fontWeight: 'bold', color:"white"}}>{departureTime}</Title>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'left', fontSize: 20, color:"white" }}>{departureTimeAMPM}</Paragraph>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'left', fontSize: 15, color:"white" }}>{"UCSB"}</Paragraph>
                        </View>
                        <View style={{marginLeft: 24}}>
                            <Entypo name={"flow-line"} size={90} color={"white"} style={{ transform: [{ rotate: '90deg' }], marginTop: -32}} />
                            <Paragraph  style={{ textAlign: 'center', fontSize: 15, color:"white", marginTop: -26 }}>{hours + "H " + minutes + " M"}</Paragraph>
                            <Paragraph  style={{ textAlign: 'center', fontSize: 15, color:"white" }}>{ rideDetails.tripDistance.toFixed(1) + " mi"}</Paragraph>
                        </View>
                        <View style={{ marginLeft: 'auto' }}>
                            {/* SUBSTITUTE */}
                            <Title style={{textAlign: 'right', fontSize: 30, fontWeight: 'bold', color:"white",}}>{arrivalTime}</Title>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'right', fontSize: 20, color:"white" }}>{arrivalTimeAMPM}</Paragraph>
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
                            <Title style={{fontSize: 30, fontWeight: 'bold', color:"white"}}>{driverDetails && driverDetails.firstName + " " + driverDetails.lastName[0] + "."}</Title>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'left', fontSize: 15, color:"white" }}>{"Rating: 4.5"}</Paragraph>
                            {/* SUBSTITUTE */}
                            <Paragraph  style={{ textAlign: 'left', fontSize: 15, color:"white" }}>{"Vehicle Model: Toyota Camry"}</Paragraph>
                        </View>
                        <View>
                            <Entypo name={"star"} size={17} color={"white"} style={{ marginLeft: -126, marginTop: 9 }} />
                        </View>
                    </Card.Content>
                </Card>
                <View style={{ backgroundColor: 'white', paddingVertical: 10, alignItems: 'center', margin: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Receipt</Text>
                </View>
                <Card style={styles.card}>
                    <Card.Content style={{ alignItems: 'left' }}>
                        {/* Trip Cost */}
                        <Paragraph style={{ textAlign: 'left', fontSize: 15, color: "white" }}>
                            {"Price for Ride "  + " ................  $" + Number(rideDetails.totalPrice).toFixed(2)}
                        </Paragraph>
                        {/* Service Fee */}
                        <Paragraph style={{ textAlign: 'left', fontSize: 15, color: "white" }}>
                            {"Service Fees  ..........................  $5.00"}
                        </Paragraph>
                    </Card.Content>
                    <Card style={styles.card2}>
                        <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        {/* Total */}
                            <Paragraph style={{ fontWeight: 'bold', fontSize: 16, color: "black" }}>
                            {"Total Earnings:"}
                            </Paragraph>
                            <Paragraph style={{ fontWeight: 'bold', fontSize: 18, color: "black" }}>
                            {"$" + (Number(rideDetails.totalPrice).toFixed(2) - 5).toFixed(2)}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </Card>
            </View>
        </ScrollView>
    )
};

export default DriversRideDetailScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 20,
        flex: 1,
        backgroundColor: "#D3D3D3",
    },
    card: {
        backgroundColor: '#002E5D',
        width: 350,
        marginHorizontal: 36,
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