import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Text, Button, SegmentedButtons } from "react-native-paper";
import auth from "../../app/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [segButtonValue, setSegButtonValue] = useState("Authentication Off");

  const createUserWithNameEmailAndPassword = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("Account created successfully.");
        if (user) {
          user.displayName = firstName + " " + lastName;
          console.log("Display Name: ", user.displayName);
          navigation.navigate("MainContainer");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("ERROR: ", errorMessage);
      });
  };

  const handleButtonPress = async () => {
    setLoading(true);
    if (segButtonValue == "Authentication On") {
      if (signingIn) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Signed in successfully.");
            navigation.navigate("MainContainer");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("ERROR: ", errorMessage);
          });
      } else {
        createUserWithNameEmailAndPassword();
      }
    } else {
      navigation.navigate("MainContainer");
    }
  };

  const handleSigningInClick = () => {
    setSigningIn(!signingIn);
  };

  let buttonLabel;
  if (segButtonValue == "Authentication Off") buttonLabel = "Continue";
  else if (signingIn) buttonLabel = "Login";
  else buttonLabel = "Sign Up";

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
        <TouchableOpacity
          onPress={handleButtonPress}
          style={styles.buttonContainer}
        >
          <Button
            style={styles.button}
            mode="contained"
            buttonColor="#FF4618"
            labelStyle={styles.buttonText}
          >
            {buttonLabel}
          </Button>
        </TouchableOpacity>

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
        <SegmentedButtons
          style={styles.authToggle}
          value={segButtonValue}
          onValueChange={setSegButtonValue}
          buttons={[
            {
              value: "Authentication On",
              label: "Authentication On",
            },
            {
              value: "Authentication Off",
              label: "Authentication Off",
            },
          ]}
        />
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
  },
  button: {
    width: "100%",
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    width: "100%",
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
  authToggle: {
    width: "80%",
    paddingTop: 10,
  },
});
