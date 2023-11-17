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
  return (total / seatsReserved).toFixed(2);
}

export default async function acceptRide(docUID) {
  const user = auth.currentUser;
  if (user) {
    rideOffer = await getDoc(docUID);
    totalPrice = rideOffer.get("totalPrice");
    newSeatsTaken = rideOffer.get("seatsTaken") + 1;
    acceptedSeatPrice = rideOffer.get("seatPrice");
    updatedRideOffer = await updateDoc(docUID, {
      seatsTaken: newSeatsTaken,
      seatPrice: adjustSeatPrice(totalPrice, newSeatsTaken),
      pasengersUserUID: arrayUnion([user.uid]),
    });
    newSeatPrice = updatedRideOffer.get("seatPrice");
    addDoc(
      collection(firestore, "acceptedRidesPassenger", {
        acceptedOn: Timestamp.now(),
        pasengerUserUID: user.uid,
        rideOffer: doc(firestore, "rideOffers/" + docUID),
        rideCost: acceptedSeatPrice,
        passengersAmount: newSeatsTaken,
        newSeatPrice: newSeatPrice,
      })
    );
  }
}
