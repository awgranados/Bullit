import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Text, Button } from "react-native-paper";

export default function Login({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(true);

  const handleSigningInClick = () => {
    setSigningIn(!signingIn);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.container}>
        {signingIn ? (
          <Text style={styles.header}>Login</Text>
        ) : (
          <>
            <Text style={styles.header}>Create Account</Text>
            <TextInput
              style={styles.input}
              label="First Name"
              onChangeText={setFirstName}
              mode="outlined"
              outlineColor="#002E5D"
            ></TextInput>
            <TextInput
              style={styles.input}
              label="Last Name"
              onChangeText={setLastName}
              mode="outlined"
              outlineColor="#002E5D"
            ></TextInput>
          </>
        )}

        <TextInput
          style={styles.input}
          label="Email"
          onChangeText={setEmail}
          mode="outlined"
          outlineColor="#002E5D"
        ></TextInput>
        <TextInput
          style={styles.input}
          label="Password"
          onChangeText={setPassword}
          mode="outlined"
          outlineColor="#002E5D"
          secureTextEntry
        ></TextInput>
        <Button
          style={styles.buttonContainer}
          mode="contained-tonal"
          onPress={() => navigation.navigate("MainContainer")}
        >
          <Text style={styles.buttonText}>
            {signingIn ? "Login" : "Sign Up"}
          </Text>
        </Button>

        <View style={styles.bottom}>
          {signingIn ? (
            <Text style={styles.bottomMessage}>Don't have an account? </Text>
          ) : (
            <Text style={styles.bottomMessage}>Already have an account? </Text>
          )}
          <TouchableOpacity onPress={handleSigningInClick}>
            {signingIn ? (
              <Text style={styles.innerButton}>Sign up</Text>
            ) : (
              <Text style={styles.innerButton}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  buttonContainer: {
    width: "80%",
    backgroundColor: "#FF4618",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    height: 48,
    width: "80%",
    margin: 10,
  },
  bottom: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  innerButton: {
    color: "red",
  },
  bottomMessage: {
    color: "#6a6a6a",
  },
});
