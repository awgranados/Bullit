import * as React from 'react';
import{ useState } from 'react';
import {View, Text, StyleSheet, Modal, TextInput} from 'react-native';
import {CreateButton, IconButton} from 'app/app/button';
import { Avatar, Button, Card } from 'react-native-paper';
import { doc, setDoc, Timestamp, GeoPoint, getDoc, data} from "firebase/firestore";
import { firestore } from "../../app/firebaseConfig";
import { updateProfile } from "firebase/auth";



export default function ProfileScreen({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  
  const user = auth.currentUser;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  //style={{ textAlign: 'right', fontSize: 15, color:"black" }}>{user.email}
  
  //const userDocRef = doc(firestore, "userDetails", user.uid);
  console.log(user);

  
  const signOut = () => {
    if(user){
     auth.signOut;
      navigation.navigate("Login");
    }
  };

  const updateDisplayName = () => {
    if (user) {
      if (newDisplayName.length === 0) {
        alert("Display name cannot be blank.");
      }
      else{
        updateProfile(user, {
          displayName: newDisplayName
        }).then(() => {
          toggleModal();
        }).catch((error) => {
          console.error("Display name failed to update!", error);
      })};
    }
  };
  
  return(
      
      <View style = {styles.container}>    

          <Text style={styles.header}>{user.displayName}</Text>
          <Text style = {styles.text}>{}</Text>                       
          <CreateButton text='Edit Profile'onPress={toggleModal} />
          <CreateButton text='Logout' onPress={signOut}/>
          <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Edit Display Name</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter new display name"
            onChangeText={setNewDisplayName}
            value={newDisplayName}
          />
          <CreateButton text="Save" onPress={updateDisplayName} />
          <CreateButton text="Cancel" onPress={toggleModal} />
        </View>
      </Modal>
      </View>
  );

  
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#FFFFFF",
  },
  header: {
      fontSize: 35,
      fontWeight: "bold", 
      padding: 10, 
      color: '#002E5D'
  },
  text: {
      fontSize: 20,
      fontWeight: "bold", 
      padding: 3, 
      color: '#002E5D'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
  },
  Button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#FF4618',
    width: 250,
    height: 50,
    alignSelf: 'center'
},
});