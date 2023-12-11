import * as React from 'react';
import{ useState } from 'react';
import {View, Text, StyleSheet, Modal, TextInput, TouchableOpacity} from 'react-native';
import {CreateButton, IconButton} from 'app/app/button';
import { Avatar, Button, Card } from 'react-native-paper';
import { doc, setDoc, Timestamp, GeoPoint, getDoc, data} from "firebase/firestore";
import { firestore } from "../../app/firebaseConfig";
import { updateProfile} from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';




export default function ProfileScreen({navigation}) {
  const user = auth.currentUser;
  const [isModalVisible, setModalVisible] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [profilePicture, setNewProfilePicture] = useState(user.photoURL);

  
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const signOut = () => {
    if(user){
     auth.signOut;
     navigation.navigate("Login");
    }
  };

  const updateProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setNewProfilePicture(result.assets[0].uri)
      updateProfile(user, {
        photoURL: result.assets[0].uri
      })
      console.log(result.assets[0].uri);
      console.log(user.photoURL);
    } 
  };
  
  

  const updateDisplayName = () => {
    console.log(user.displayName)
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
      
    <View style={styles.container}>
    <View style={styles.profileContainer}>
      <TouchableOpacity /* replace with zoom-in function*/> 
        {profilePicture ? (
          <Avatar.Image size={250} source={{ uri: profilePicture }} />
        ) : (
          <Ionicons name="person-circle-outline" size={250} color="#002E5D" />
        )}
      </TouchableOpacity>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={updateProfilePicture}
      >
        <Ionicons name="pencil-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>

          <Text style={styles.header}>{user.displayName}</Text>
          <Text style = {styles.text}>{}</Text>                       
          <CreateButton text='Edit Display Name'onPress={toggleModal} />
          <CreateButton text='Logout' onPress={signOut}/>
          <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Edit Display Name</Text>
          <TextInput
            style={styles.modalInput}
            placeholder={user.displayName}
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
buttonContainer: {
  marginTop: 20, 
  width: '100%', 
  alignItems: 'center',
  marginBottom: 20,
},
editButton: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#002E5D',
  padding: 10,
  borderRadius: 50,
  zIndex: 1, // Ensure the button is displayed on top
},
});