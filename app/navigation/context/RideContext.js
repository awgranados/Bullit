import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../../app/firebaseConfig';
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import auth from "../../app/firebaseConfig";

const RideContext = createContext(null);

export const RideProvider = ({ children }) => {
  const [rideOffers, setRideOffers] = useState([]);
  const user = auth.currentUser;

  // Function to add a ride offer to Firestore
  const addRideOffer = async (offer) => {
    offer["driverUserUID"] = user.uid
    await addDoc(collection(firestore, 'rideOffers'), offer);
  };


  // Fetch ride offers from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'rideOffers'), (snapshot) => {
      const newOffers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRideOffers(newOffers);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <RideContext.Provider value={{ rideOffers, addRideOffer}}>
      {children}
    </RideContext.Provider>
  );
};

export default RideContext;