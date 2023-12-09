//save ride offer reference
//delete rides from accepted passenger rides
//find driver accepted rides where driver user uid match 
//check if seatsTaken is 0 after decrement by 1, if so delete doc

import { firestore } from "../../app/firebaseConfig";
import auth from "../../app/firebaseConfig";

import {
  updateDoc,
  getDocs,
  getDoc,
  collection,
  doc,
  deleteDoc,
  where,
  query
} from "firebase/firestore";

function adjustSeatPrice(total, seatsReserved) {
  return Number((total / (seatsReserved + 1)).toFixed(2));
}

export default async function cancelRide(docUID) {
  const user = auth.currentUser;
  if (user) {
    try {

        rideOffer = await getDoc(doc(firestore, "rideOffers", docUID));
        totalPrice = rideOffer.data().totalPrice;
        newSeatsTaken = rideOffer.data().seatsTaken - 1;
        let acceptedSeatPrice;
        if (newSeatsTaken === 0) acceptedSeatPrice = 0;
        else acceptedSeatPrice = totalPrice / newSeatsTaken;
        let passengersUserUID = rideOffer.data().passengersUserUID;
        const newPassengersUserUID = passengersUserUID.filter(item => item !== user.uid);
      

        //update ride offer to refelct new price and seats taken
        await updateDoc(doc(firestore, "rideOffers", docUID), {
        seatsTaken: Number(newSeatsTaken),
        passengerSeatCost: Number(acceptedSeatPrice),
        seatPrice: adjustSeatPrice(totalPrice, newSeatsTaken),
        passengersUserUID: newPassengersUserUID,
        });

        //delete from accepted passenger rides

        const docReference = doc(firestore, 'rideOffers', docUID);

        // Define the condition
        const condition = where('rideOffer', '==', docReference);
        
        // Create a query with the specified condition
        const q = query(collection(firestore, 'acceptedPassengerRides'), condition);
        
        // Get the documents that match the condition
        const querySnapshot = await getDocs(q);
        // Check if there is exactly one matching document

        // Iterate over the matching documents and delete the one for current user
        querySnapshot.forEach((doc) => {
                if (doc.data().passengerUserUID == user.uid){
                    deleteDoc(doc.ref)
                    .then(() => {
                        console.log('Document successfully deleted!');
                    })
                    .catch((error) => {
                        console.error('Error deleting document:', error);
                    });
            }
        });

        if (newSeatsTaken === 0){
            //delete from accepted driver rides
            // Create a query with the specified condition
            const q = query(collection(firestore, 'acceptedDriverRides'), condition);
            
            // Get the documents that match the condition
            const querySnapshot = await getDocs(q);
            // Check if there is exactly one matching document
            if (querySnapshot.size === 1) {
                // Get the document reference and delete it
                const documentSnapshot = querySnapshot.docs[0];
                await deleteDoc(documentSnapshot.ref);
                console.log('Document successfully deleted!');
            } else if (querySnapshot.size === 0) {
                console.log('No matching documents found.');
            } else {
                console.error('More than one matching document found. Ensure there is only one.');
            }
        }
    } catch (error) {
      console.log(error.message);
    }
  }
}
