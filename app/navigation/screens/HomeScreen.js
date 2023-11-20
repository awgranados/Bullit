import * as React from "react";
import { useState } from "react";
import LoginButton from "app/app/button";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Accordion,
  List,
  Title,
  Paragraph,
  TouchableRipple,
} from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RideContext from "../context/RideContext";

export default function HomeScreen({ navigation }) {
  const { rideRequests } = React.useContext(RideContext);
  const { rideOffers } = React.useContext(RideContext);
  const [expandedUpcoming, setExpandedUpcoming] = useState(false);
  const [expandedPosted, setExpandedPosted] = useState(false);
  const handleExpandUpcoming = () => {
    setExpandedUpcoming(!expandedUpcoming);
  };
  const handleExpandPosted = () => {
    setExpandedPosted(!expandedPosted);
  };
  const isDriver = true;

  const openDetailScreen = (rideDetails) => {
    navigation.navigate("RideDetail", { rideDetails });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Home Screen</Text>
      </View>

      <View style={{ flex: 1 }}>
        {/* <Text style={styles.text2}>Posted Ride Offers</Text> */}
        <ScrollView>
          <List.Accordion
            expanded={expandedUpcoming}
            onPress={handleExpandUpcoming}
            style={{ marginTop: 10 }}
            title="Upcoming Trips"
          >
            <View style={{ marginTop: 10, alignItems: "center" }}>
              {rideOffers.map((offer, index) => (
                <TouchableRipple
                  key={index}
                  onPress={() => openDetailScreen(offer)}
                >
                  <Card key={index} style={styles.card}>
                    {/* <Card.Title title={`Ride ${index + 1}`} titleStyle={styles.text4} subtitle={`Destination: ${offer.destination}`} subtitleStyle={styles.text3} /> */}
                    <Card.Content
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ marginRight: 16 }}>
                        <Title
                          style={{
                            fontSize: 30,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {22}
                        </Title>
                        <Paragraph
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "white",
                          }}
                        >
                          {"Nov"}
                        </Paragraph>
                      </View>
                      <View style={styles.iconContainer}>
                        <MaterialIcons
                          name={"my-location"}
                          size={25}
                          color={"white"}
                          marginTop={15}
                        />
                        <Entypo
                          name={"dots-three-vertical"}
                          size={25}
                          color={"white"}
                          marginTop={5}
                        />
                        <MaterialIcons
                          name={"location-pin"}
                          size={25}
                          color={"white"}
                          marginTop={3}
                        />
                      </View>
                      <View style={{ position: "relative" }}>
                        {/* if driver then using steering wheel icon, else use passenger icon */}
                        {/* SUBSTITUTE */}
                        {isDriver ? (
                          <MaterialCommunityIcons
                            name={"steering"}
                            size={50}
                            color={"white"}
                            marginTop={15}
                            position={"absolute"}
                            top={-70}
                            right={-230}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name={"seat-passenger"}
                            size={50}
                            color={"white"}
                            marginTop={15}
                            position={"absolute"}
                            top={-70}
                            right={-230}
                          />
                        )}
                        <Text
                          style={{
                            color: "red",
                            position: "absolute",
                            top: 10,
                            right: -230,
                          }}
                        >
                          {"Reserved:"}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text
                          style={{
                            color: "red",
                            marginTop: 20,
                            position: "absolute",
                            top: 10,
                            right: -226,
                          }}
                        >
                          {"1/6 seats"}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 20, color: "white" }}>
                          {"UCSB"}
                        </Text>
                        <Text style={{ color: "white" }}>{"11:00 AM"}</Text>
                        <Text
                          style={{ fontSize: 20, marginTop: 5, color: "white" }}
                        >
                          {offer.destination && offer.destination.split(",")[0]}
                        </Text>
                        <Text style={{ color: "white" }}>{"1:00 PM"}</Text>
                      </View>

                      {/* <Text variant="titleLarge" style={styles.text3}>Departure: {offer.departure} </Text>
                                                <Text variant="titleLarge" style={styles.text3}>Total distance:</Text>
                                                <Text variant="bodyMedium" style={styles.text3}>Fuel price: {offer.fuelPrice} $</Text>
                                                <Text variant="bodyMedium" style={styles.text3}>Vehicle Model:</Text> */}
                    </Card.Content>
                    {/* <Card.Actions>
                                            <Button onPress ={() => navigation.navigate('Home')} style={styles.button}><Text style={styles.text3}>Cancel Ride</Text></Button>
                                        </Card.Actions> */}
                  </Card>
                </TouchableRipple>
              ))}
            </View>
          </List.Accordion>
          <List.Accordion
            expanded={expandedPosted}
            onPress={handleExpandPosted}
            style={{ marginTop: 10 }}
            title="Posted Ride Offers"
          >
            <View style={{ marginTop: 10, alignItems: "center" }}>
              {rideOffers.map((offer, index) => (
                <TouchableRipple
                  key={index}
                  onPress={() => openDetailScreen(offer)}
                >
                  <Card key={index} style={styles.card}>
                    {/* <Card.Title title={`Ride ${index + 1}`} titleStyle={styles.text4} subtitle={`Destination: ${offer.destination}`} subtitleStyle={styles.text3} /> */}
                    <Card.Content
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ marginRight: 16 }}>
                        {/* SUBSTITUTE */}
                        <Title
                          style={{
                            fontSize: 30,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          {22}
                        </Title>
                        {/* SUBSTITUTE */}
                        <Paragraph
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "white",
                          }}
                        >
                          {"Nov"}
                        </Paragraph>
                      </View>
                      <View style={styles.iconContainer}>
                        <MaterialIcons
                          name={"my-location"}
                          size={25}
                          color={"white"}
                          marginTop={15}
                        />
                        <Entypo
                          name={"dots-three-vertical"}
                          size={25}
                          color={"white"}
                          marginTop={5}
                        />
                        <MaterialIcons
                          name={"location-pin"}
                          size={25}
                          color={"white"}
                          marginTop={3}
                        />
                      </View>
                      <View style={{ position: "relative" }}>
                        <Text
                          style={{
                            color: "white",
                            position: "absolute",
                            marginTop: 15,
                            top: -70,
                            right: -230,
                          }}
                        >
                          {"Total Earning:"}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text
                          style={{
                            color: "white",
                            position: "absolute",
                            marginTop: 35,
                            top: -70,
                            right: -226,
                          }}
                        >
                          {"$60"}
                        </Text>
                        <Text
                          style={{
                            color: "red",
                            position: "absolute",
                            top: 10,
                            right: -230,
                          }}
                        >
                          {"Reserved:"}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text
                          style={{
                            color: "red",
                            marginTop: 20,
                            position: "absolute",
                            top: 10,
                            right: -226,
                          }}
                        >
                          {"1/6 seats"}
                        </Text>
                      </View>
                      <View>
                        {/* SUBSTITUTE */}
                        <Text style={{ fontSize: 20, color: "white" }}>
                          {"UCSB"}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text style={{ color: "white" }}>{"11:00 AM"}</Text>
                        <Text
                          style={{ fontSize: 20, marginTop: 5, color: "white" }}
                        >
                          {offer.destination && offer.destination.split(",")[0]}
                        </Text>
                        {/* SUBSTITUTE */}
                        <Text style={{ color: "white" }}>{"1:00 PM"}</Text>
                      </View>

                      {/* <Text variant="titleLarge" style={styles.text3}>Departure: {offer.departure} </Text>
                                                <Text variant="titleLarge" style={styles.text3}>Total distance:</Text>
                                                <Text variant="bodyMedium" style={styles.text3}>Fuel price: {offer.fuelPrice} $</Text>
                                                <Text variant="bodyMedium" style={styles.text3}>Vehicle Model:</Text> */}
                    </Card.Content>
                    {/* <Card.Actions>
                                            <Button onPress ={() => navigation.navigate('Home')} style={styles.button}><Text style={styles.text3}>Cancel Ride</Text></Button>
                                        </Card.Actions> */}
                  </Card>
                </TouchableRipple>
              ))}
            </View>
          </List.Accordion>
        </ScrollView>
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
    marginTop: 10,
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#002E5D",
  },
  text2: {
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
