import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../../app/firebaseConfig';
import { collection, onSnapshot, addDoc } from "firebase/firestore";

const RideContext = createContext(null);

export const RideProvider = ({ children }) => {
  const [rideOffers, setRideOffers] = useState([]);
  const [rideRequests, setRideRequests] = useState([]);

  // Function to add a ride offer to Firestore
  const addRideOffer = async (offer) => {
    await addDoc(collection(firestore, 'rideOffers'), offer);
  };

  // Function to add a ride request to Firestore
  const addRideRequest = async (request) => {
    await addDoc(collection(firestore, 'rideRequests'), request);
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
  
  // Fetch ride requests from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'rideRequests'), (snapshot) => {
      const newRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRideRequests(newRequests);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <RideContext.Provider value={{ rideOffers, rideRequests, addRideOffer, addRideRequest }}>
      {children}
    </RideContext.Provider>
  );
};

export default RideContext;