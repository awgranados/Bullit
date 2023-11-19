import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CreateButton, IconButton } from "app/app/button";
import { Avatar, Button, Card } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import RideContext from "../context/RideContext";
import acceptRide from "../actions/acceptRide";

export default function PassengerScreen({ navigation }) {
  const [region, setRegion] = React.useState({
    latitude: 34.413963,
    longitude: -119.848946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const { rideOffers } = React.useContext(RideContext);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Passenger Screen</Text>
      </View>
      <View style={{ padding: 20, flexDirection: "column", gap: 10 }}>
        <CreateButton
          text="Create Ride Request"
          onPress={() => navigation.navigate("CreateRideRequest")}
        />
        <GooglePlacesAutocomplete
          placeholder="Search for Destination"
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          onPress={(data, details = null) => {
            console.log(data["description"]);
            const location_name = data["description"];
            console.log(location_name);
            navigation.navigate("RideList", { school: location_name });
          }}
          query={{
            key: "AIzaSyD5s29CI_yIZQyR2TsfucfAtVpZCLMINcs",
            language: "en",
            components: "country:us",
            types: "establishment",
            radius: 30000,
            location: `${region.latitude}, ${region.longitude}`,
          }}
          styles={{
            container: { flex: 0, width: "100%", zIndex: 1 },
            listView: { backgroundColor: "black" },
          }}
        />

        {rideOffers.map((offer, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title
              title={`Ride ${index + 1}`}
              titleStyle={styles.text3}
              subtitle={`Destination: ${offer.destination}`}
              subtitleStyle={styles.text3}
            />
            <Card.Content>
              <Text variant="titleLarge" style={styles.text3}>
                Departure: {offer.departure}{" "}
              </Text>
              <Text variant="titleLarge" style={styles.text3}>
                Total distance:
              </Text>
              <Text variant="bodyMedium" style={styles.text3}>
                Fuel price: $ {offer.fuelPrice}{" "}
              </Text>
              <Text variant="bodyMedium" style={styles.text3}>
                Vehicle Model:
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => acceptRide(offer.id)}
                style={styles.button}
              >
                <Text style={styles.text3}>Accept Ride</Text>
              </Button>
            </Card.Actions>
          </Card>
        ))}
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
  text: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#002E5D",
  },
  card: {
    backgroundColor: "#002E5D",
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#002E5D",
  },
  text3: {
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#FF4618",
  },
});
