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
      /*
      * * * * * Update rideOffers Collection * * * * *
      *   
      *   Add passengerUID into accepted ride offer doc
      *   Caculate the new seat price after adding a new passenger and update seatPrice
      *   Increment seatsTaken by 1   
      * 
      */
      rideOffer = await getDoc(doc(firestore, "rideOffers", docUID));
      totalPrice = rideOffer.data().totalPrice;
      newSeatsTakenForCalculation = rideOffer.data().seatsTaken + 2;
      newSeatsTaken = rideOffer.data().seatsTaken + 1;
      acceptedSeatPrice = rideOffer.data().seatPrice;
      await updateDoc(doc(firestore, "rideOffers", docUID), {
        seatsTaken: newSeatsTaken,
        seatPrice: adjustSeatPrice(totalPrice, newSeatsTakenForCalculation),
        passengersUserUID: arrayUnion(user.uid),
      });

      /*
      * * * * * Create New acceptedPassengerRides Doc * * * * *
      *   
      *   acceptedOn: timestamp of now
      *   passengerUID: current user's UID
      *   rideOffer: reference to the rideOffer doc the user accepted
      *   rideCost: current cost of ride for the user
      *   passengersAmount: current amount of seats taken for ride
      *   newSeatPrice: the new seat price for the ride after the user has accepted ride 
      * 
      */
      updatedRideOffer = await getDoc(doc(firestore, "rideOffers", docUID));
      newSeatPrice = updatedRideOffer.data().seatPrice;
      await addDoc(collection(firestore, "acceptedPassengerRides"), {
        acceptedOn: Timestamp.now(),
        departureTime: rideOffer.data().departureTime,
        departure: rideOffer.data().departure,
        destination: rideOffer.data().destination,
        arrivalTime: rideOffer.data().arrivalTime,
        seatsAvailable: rideOffer.data().seatsAvailable,
        seatsTaken: newSeatsTaken,
        passengerUserUID: user.uid,
        rideOffer: doc(firestore, "rideOffers/" + docUID),
        rideCost: acceptedSeatPrice,
        newSeatPrice: newSeatPrice,
      });

      /*
      * * * * * Create New acceptedDriverRides Doc (if the ride offer has one passenger) * * * * *
      *   
      *   firstAcceptedOn: timestamp of now
      *   driverUserUID: driver for ride offer user UID
      *   rideOffer: reference to the rideOffer doc the user accepted
      *   passengersAmount: current amount of seats taken for ride
      *   passengersUserUID: list of user UIDs for passengers who have accepted the ride
      * 
      */
     if (newSeatsTaken == 1) {
      await addDoc(collection(firestore, "acceptedDriverRides"), {
        firstAcceptedOn: Timestamp.now(),
        departureTime: rideOffer.data().departureTime,
        departure: rideOffer.data().departure,
        destination: rideOffer.data().destination,
        arrivalTime: rideOffer.data().arrivalTime,
        seatsAvailable: rideOffer.data().seatsAvailable,
        seatsTaken: newSeatsTaken,
        driverUserUID: updatedRideOffer.data().driverUserUID,
        rideOffer: doc(firestore, "rideOffers/" + docUID),
        passengersUserUID: updatedRideOffer.data().passengersUserUID,
      });
    }

    } catch (error) {
      console.log(error.message);
    }
  }
}
