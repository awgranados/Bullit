# Accepting a Ride Offer

### Ride Offers, Accepted Passenger, and Accepted Driver Rides Firestore Collections
<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/f506ea78-c840-4e5d-b33d-5f05a36ee648" width="900">

## PR https://github.com/ucsb-cs184-f23/pj-react-02/pull/48 Accept Ride

When a user accepts a ride as a passenger the acceptRide function will:

1. Retrieve and update the ride offer from the "rideOffers" firestore collection
    - Increment amount of seats taken
    - Adjust the seat price for the next passenger that can accept ride
    - Add current user UID to the array of passengersUserUID

**Tap Accept Ride**
<br>
<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/ebc3ecfb-f102-41ac-942b-0cbd6580242f" width="200">
<br>
**Before Accepting**
<br>
<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/ec3c3df2-1a31-43c6-a9c7-62ce2921b1fb" width="700">
<br>
**After Accepting**
<br>
<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/e1a3a773-723b-4402-9c86-b9cb48266de4" width="700">

2. Create new accepted passenger ride doc in acceptedPassengerRides Firestore collection
    - acceptedOn: timestamp of when ride is accepted
    - passengerUserUID: passenger who accepted offer user UID
    - rideOffer: reference to the document for the ride offer
    - rideCost: current cost of trip for the passenger
    - passengersAmount: the current amount of passengers who have accepted ride offer
    - newSeatPrice: the new calculated seat price for the next passenger that accepts ride offer
      <br>(will be used to determine if price of ride has changed for this passenger)

<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/b37faf63-503a-4b21-84e4-f6bc867d30ae" width="800">
<br><br>

**If the passenger accepting ride is the first person accepting the ride offer,**

3. Create new accepted driver ride, if the passenger accepting the ride is the first passenger for the ride offer
    - firstAcceptedOn: timestamp of when ride is accepted
    - driverUserUID: user UID of the driver associated to the ride offer
    - rideOffer: reference to the document for the ride offer
    - passengersAmount: the current amount of passengers who have accepted ride offer
    - passengersUserUID: passengers who accepted ride offer
      <br> (will be used to determine if new passengers have accepted ride)

<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/76a9daa8-a793-4f19-9e3f-f11a8095dd29" width="800">

## PR https://github.com/ucsb-cs184-f23/pj-react-02/pull/48 Retrieve Accepted Rides

The getAcceptedRidesByUser function will retrieve the accepted passenger and driver rides by user UID. It provides a live snapshot
of the docs and updates the lists as it detects changes to the queried documents.

1. Get accepted passenger rides from "acceptedPassengerRides" Firestore collection
2. Get accepted driver rides from "acceptedDriverRides" Firestore collection
3. Updates list/s using callback functions to set the lists to the retrieved data (empty list/s if it/they don't exist)
