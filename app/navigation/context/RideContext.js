import React, { createContext, useState } from 'react';

const RideContext = createContext(null);

export const RideProvider = ({ children }) => {
  const [rideOffers, setRideOffers] = useState([]);
  const [rideRequests, setRideRequests] = useState([]);

  const addRideOffer = (offer) => {
    setRideOffers(prevOffers => [...prevOffers, offer]);
  };

  const addRideRequest = (request) => {
    setRideRequests(prevRequests => [...prevRequests, request]);
  };

  return (
    <RideContext.Provider value={{ rideOffers, rideRequests, addRideOffer, addRideRequest }}>
      {children}
    </RideContext.Provider>
  );
};

export default RideContext;