import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Card,
  List,
  Title,
  Paragraph,
  TouchableRipple,
} from "react-native-paper";
import { Button } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RideContext from "../context/RideContext";
import getAcceptedRidesByUser from "../actions/getAcceptedRidesByUser";
import getRideOffersByDriver from "../actions/getRideOffersByDriver";
import { getRideOfferByReference } from "../actions/getRideOfferByRefrence";
import { FontAwesome5 } from '@expo/vector-icons'; 


export default function HomeScreen({ navigation }) {
  const { rideOffers } = React.useContext(RideContext);
  const [expandedUpcoming, setExpandedUpcoming] = useState(true);
  const [expandedPosted, setExpandedPosted] = useState(false);
  const [acceptedPassengerRides, setAcceptedPassengerRides] = React.useState(
    []
  );
  const [acceptedDriverRides, setAcceptedDriverRides] = React.useState([]);
  const [acceptedRides, setAcceptedRides] = React.useState([]);
  const [postedRideOffers, setPostedRideOffers] = React.useState([])

  
  React.useEffect(() => {
    const unsubscribe = getAcceptedRidesByUser([
      setAcceptedPassengerRides,
      setAcceptedDriverRides,
    ]);
    
    // Clean up the listeners when the component unmounts
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    try {
      const unsubscribe = getRideOffersByDriver(setPostedRideOffers);
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching ride offers:", error);
    }
  }, []);
  
  React.useEffect(() => {
    //Combine lists of accepted rides
    const mergedAcceptedRides = [...acceptedPassengerRides, ...acceptedDriverRides];
    if (mergedAcceptedRides && mergedAcceptedRides.length > 0) {
      //sort by nearest departureTime
      mergedAcceptedRides.sort((a, b) => {
        const timeA = a.departureTime.toDate();
        const timeB = b.departureTime.toDate();
      
        return timeA - timeB;
        });
        setAcceptedRides(mergedAcceptedRides);
      }
  }, [acceptedDriverRides, acceptedPassengerRides])

  const handleExpandUpcoming = () => {
    setExpandedUpcoming(!expandedUpcoming);
  };
  const handleExpandPosted = () => {
    setExpandedPosted(!expandedPosted);
  };
  const isDriver = true;

  const openDetailScreen = async (rideDetails, title) => {
    //fetch ride offer of accepted ride using reference
    if (title === "Upcoming Trips")
    rideDetails = await getRideOfferByReference(rideDetails.rideOffer)

    navigation.navigate("RideDetail", { rideDetails });
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", justifyContent: "space-between", alignItems:"center", paddingHorizontal: 36}}>
        <Text style={styles.text}>BULLIT</Text>
        <MaterialIcons onPress={() => navigation.navigate("Profile")} name="account-circle" size={38} color="#002E5D" style={{marginTop: 20, marginRight: 12}} />
      </View>
    <View style={{borderColor: "#EFEFF0", borderWidth: 1.7} }></View>
      <View style={{ flex: 1 }}>
        {/* <Text style={styles.text2}>Posted Ride Offers</Text> */}
        <ScrollView>
          <List.Accordion
            expanded={expandedUpcoming}
            onPress={handleExpandUpcoming}
            style={{ marginTop: 6, paddingLeft: 23,  }}
            title="Upcoming Trips"
            titleStyle= {{ fontSize: 18, fontFamily: "Montserrat-SemiBold"}}
          >
            <View style={{ paddingBottom: 28, alignItems: "center", backgroundColor: "#F4F4F4",}}>
              {acceptedRides.map((offer, index) => {
                const departureDate = offer.departureTime.toDate();
                const departureDay = departureDate.getDate();
                const departureMonth = departureDate.toLocaleString('en-us', { month: 'short' });
                const departureTime = departureDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const arrivalDate = offer.arrivalTime.toDate();
                const arrivalTime = arrivalDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const sectionTitle = "Upcoming Trips"
                return(
                <TouchableRipple
                  key={index}
                  onPress={() => openDetailScreen(offer, sectionTitle)}
                >
                  <Card key={index} style={styles.card}>
                    <Card.Content
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ marginRight: 16 }}>
                        <Title
                          style={{
                            textAlign: "center",
                            fontSize: 31,
                            fontFamily: "Montserrat-Bold",
                            color: "white",
                            marginBottom: -2
                          }}
                        >
                          {departureDay}
                        </Title>
                        <Paragraph
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontFamily: "Montserrat-Medium",
                            color: "white",
                          }}
                        >
                          {departureMonth}
                        </Paragraph>
                      </View>
                      <View style={styles.iconContainer}>
                        <MaterialIcons
                          name={"my-location"}
                          size={24}
                          color={"white"}
                          marginTop={15}
                        />
                        <Entypo
                          name={"dots-three-vertical"}
                          size={24}
                          color={"white"}
                          marginTop={4}
                        />
                        <MaterialIcons
                          name={"location-pin"}
                          size={24}
                          color={"white"}
                          marginTop={3}
                        />
                      </View>
                      <View style={{ position: "relative" }}>
                        {/* if driver then using steering wheel icon, else use passenger icon */}
                        {/* SUBSTITUTE */}
                        {offer.isDriver ? (
                          <MaterialCommunityIcons
                            name={"steering"}
                            size={46}
                            color={"white"}
                            marginTop={28}
                            position={"absolute"}
                            top={-70}
                            right={-230}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name={"seat-passenger"}
                            size={46}
                            color={"white"}
                            marginTop={28}
                            position={"absolute"}
                            top={-70}
                            right={-230}
                          />
                        )}
                        <Text
                          style={{
                            color: "#ff4a56",
                            fontSize: 13,
                            fontFamily: "Montserrat-SemiBold",
                            position: "absolute",
                            top: 9,
                            right: -230,
                          }}
                        >
                          {"Reserved"}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text
                          style={{
                            color: "#ff4a56",
                            fontSize: 13,
                            marginTop: 15,
                            position: "absolute",
                            top: 10,
                            right: -226,
                          }}
                        >
                          {offer.seatsTaken}/{offer.seatsAvailable} seats
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 18, color: "white", fontFamily: "Montserrat-SemiBold", letterSpacing: 1.2 }}>
                          {"UCSB"}
                        </Text>
                        <Text style={{ fontSize: 12.5, color: "white" }}>{departureTime}</Text>
                        <Text
                          style={{ fontSize: 18, marginTop: 5, color: "white", fontFamily: "Montserrat-SemiBold", letterSpacing: 1.2 }}
                        >
                          {offer.destination && offer.destination.split(",")[0]}
                        </Text>
                        <Text style={{ fontSize: 12.5, color: "white" }}>{arrivalTime}</Text>
                      </View>

                    </Card.Content>
                  </Card>
                </TouchableRipple>
              )})}
            </View>
          </List.Accordion>
          <List.Accordion
            expanded={expandedPosted}
            onPress={handleExpandPosted}
            style={{ marginTop: 10, paddingLeft: 23 }}
            title="Your Ride Offers"
            titleStyle= {{ fontSize: 18, fontFamily: "Montserrat-SemiBold" }}
          >
            <View style={{alignItems: "center", paddingBottom: 28, backgroundColor: "#F4F4F4", }}>
              {postedRideOffers.map((offer, index) => {
                const departureDate = offer.departureTime.toDate();
                const departureDay = departureDate.getDate();
                const departureMonth = departureDate.toLocaleString('en-us', { month: 'short' });
                const departureTime = departureDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const arrivalDate = offer.arrivalTime.toDate();
                const arrivalTime = arrivalDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const sectionTitle = "Your Ride Offers"

                return (
                <TouchableRipple
                  key={index}
                  onPress={() => openDetailScreen(offer, sectionTitle)}
                >
                  <Card key={index} style={styles.card}>
                    <Card.Content
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ marginRight: 16 }}>
                        {/* SUBSTITUTE */}
                        <Title
                          style={{
                            textAlign: "center",
                            fontSize: 31,
                            fontFamily: "Montserrat-Bold",
                            color: "white",
                            marginBottom: -2
                          }}
                        >
                          {departureDay}
                        </Title>
                        {/* SUBSTITUTE */}
                        <Paragraph
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontFamily: "Montserrat-Medium",
                            color: "white",
                          }}
                        >
                          {departureMonth}
                        </Paragraph>
                      </View>
                      <View style={styles.iconContainer}>
                        <MaterialIcons
                          name={"my-location"}
                          size={24}
                          color={"white"}
                          marginTop={15}
                        />
                        <Entypo
                          name={"dots-three-vertical"}
                          size={24}
                          color={"white"}
                          marginTop={4}
                        />
                        <MaterialIcons
                          name={"location-pin"}
                          size={24}
                          color={"white"}
                          marginTop={3}
                        />
                      </View>
                      <View style={{ position: "relative" }}>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Montserrat-SemiBold",
                            fontSize: 14.5,
                            position: "absolute",
                            marginTop: 33,
                            top: -70,
                            right: -230,
                          }}
                        >
                          {"Total Earnings"}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: 14.5,
                            position: "absolute",
                            marginTop: 52,
                            top: -70,
                            right: -226,
                          }}
                        >
                          ${offer.totalPrice}
                        </Text>
                        <Text
                          style={{
                            color: "#ff4a56",
                            position: "absolute",
                            fontFamily: "Montserrat-SemiBold",
                            top: 10,
                            right: -230,
                          }}
                        >
                          {"Reserved"}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text
                          style={{
                            color: "#ff4a56",
                            fontSize: 13,
                            marginTop: 15,
                            position: "absolute",
                            top: 10,
                            right: -226,
                          }}
                        >
                          {offer.seatsTaken}/{offer.seatsAvailable} seats
                        </Text>
                      </View>
                      <View>
                        {/* SUBSTITUTE */}
                        <Text style={{ fontSize: 18, color: "white", fontWeight: "600", letterSpacing: 1.2 }}>
                          {"UCSB"}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text style={{ fontSize: 12.5, color: "white" }}>{departureTime}</Text>
                        <Text
                          style={{ fontSize: 18,  marginTop: 5, color: "white", fontWeight: "600", letterSpacing: 1.2 }}
                        >
                          {offer.destination && offer.destination.split(",")[0]}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text style={{ fontSize: 12.5, color: "white" }}>{arrivalTime}</Text>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableRipple>
              )})}
            </View>
          </List.Accordion>
        </ScrollView>
      </View>
      <View style={{backgroundColor: "#F4F4F4"}}>
      <View style={{borderColor: "#d6d4d4", borderWidth: 1.2, marginBottom: 25} }></View>
      <TouchableRipple
      style={{width: "46%", alignSelf: "center", marginBottom: 25}}
      onPress={() => navigation.navigate('Create Ride Offer')}
        >
          <Button
            style={{borderRadius: 5,
                    shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.4,
                    shadowRadius: 8, 
                    elevation: 25}}
            mode="contained"
            buttonColor="#f56447"
            labelStyle={{color:"white", fontFamily: "Montserrat-SemiBold", fontSize: 18}}
          >
            <FontAwesome5 name="car" size={24} color="white" />{"  "}Offer a ride
          </Button>
          </TouchableRipple>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  card: {
    backgroundColor: "#002E5D",
    width: 350,
    marginTop: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8, 
    elevation: 30
},
  text: {
    fontFamily: "Dhurjati",
    fontSize: 60,
    fontWeight: "bold",
    color: "#FE6A43",
  },
  text2: {
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: "bold",
    color: "#002E5D",
  },
  text3: {
    color: "#FFFFFF",
  },
  text4: {
    color: "#FFFFFF",
    fontSize: 50,
  },
  button: {
    backgroundColor: "#FF4618",
  },
  iconContainer: {
    marginRight: 8,
    marginTop: -17,
  },
  icon: {
    marginTop: 4,
  },
});
