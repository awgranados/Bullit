# Accepting a Ride Offer

### Ride Offers, Accepted Passenger, and Accepted Driver Rides Firestore Collections
<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/f506ea78-c840-4e5d-b33d-5f05a36ee648" width="900">

### PR https://github.com/ucsb-cs184-f23/pj-react-02/pull/48 Accept Ride

When a user accepts a ride as a passenger the acceptRide function will:

1. Retrieve and update the ride offer from the "rideOffers" firestore collection
    - Increment amount of seats taken
    - Adjust the seat price for the next passenger that can accept ride
    - Add current user UID to the array of passengersUserUID

<div display="flex" flex-direction="row">
    <img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/ebc3ecfb-f102-41ac-942b-0cbd6580242f" width="200">
    <div display="flex" flex-direction= "column">
      <img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/ec3c3df2-1a31-43c6-a9c7-62ce2921b1fb" width="400">
      <img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/e1a3a773-723b-4402-9c86-b9cb48266de4" width="400">
    </div>
</div>
