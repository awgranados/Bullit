import { firestore } from "../../app/firebaseConfig";
import auth from "../../app/firebaseConfig";

import {
  updateDoc,
  getDoc,
  addDoc,
  collection,
  Timestamp,
  doc,
  arrayUnion,
} from "firebase/firestore";

function adjustSeatPrice(total, seatsReserved) {
  return Number((total / seatsReserved).toFixed(2));
}

export default async function acceptRide(docUID) {
  const user = auth.currentUser;
  if (user) {
    try {
      rideOffer = await getDoc(doc(firestore, "rideOffers", docUID));
      totalPrice = rideOffer.data().totalPrice;
      newSeatsTakenForCalculation = rideOffer.data().seatsTaken + 2;
      newSeatsTaken = rideOffer.data().seatsTaken + 1;
      acceptedSeatPrice = rideOffer.data().seatPrice;
      await updateDoc(doc(firestore, "rideOffers", docUID), {
        seatsTaken: newSeatsTaken,
        seatPrice: adjustSeatPrice(totalPrice, newSeatsTakenForCalculation),
        pasengersUserUID: arrayUnion(user.uid),
      });
      updatedRideOffer = await getDoc(doc(firestore, "rideOffers", docUID));
      newSeatPrice = updatedRideOffer.data().seatPrice;
      await addDoc(collection(firestore, "acceptedPassengerRides"), {
        acceptedOn: Timestamp.now(),
        pasengerUserUID: user.uid,
        rideOffer: doc(firestore, "rideOffers/" + docUID),
        rideCost: acceptedSeatPrice,
        passengersAmount: newSeatsTaken,
        newSeatPrice: newSeatPrice,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
