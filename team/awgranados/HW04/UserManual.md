User Manual
=================

Feature List
---------------


| Feature   | Status           |
|-----------|------------------|
| Signing Up | Completed |
| Logging In | Completed |
| Create New Ride | Completed |
| Viewing Ride Details | Completed |
| Cancelling Ride | Work in progres |
| Accepting Ride | Work in progres |


Signing Up
---------------
![Signing Up](https://github.com/ucsb-cs184-f23/pj-react-02/assets/114529890/826ecab7-c958-49ec-8595-58244bf1d966)
* Click on "Sign Up" button
* Fill out first name, last name, email address, and password fields
  * Blank fields will result in an error
  * Password must be 6 or more characthers

Logging In
---------------
![Logging In](https://github.com/ucsb-cs184-f23/pj-react-02/assets/114529890/46028a7d-07df-4ee2-99ba-c648526935a2)
* Fill out email and password fields with your information and then click "Continue" button 
 
Creating New Ride
---------------
![Creating New Ride](https://github.com/ucsb-cs184-f23/pj-react-02/assets/114529890/26f90e23-a022-4d46-a7a5-1a5978cc6671)

* Go to Rides Page and click "Create Ride Offer" button
* Fill out departure, destination, and trip cost fields
  * Departure location must be from UCSB
  * Trip cost must be within the range of $0-1000
* Destination field has auto-fill to ensure set location is correct

Viewing Ride Details
---------------
![Simulator Screenshot - iPhone 14 Pro - 2023-11-28 at 21 01 56](https://github.com/ucsb-cs184-f23/pj-react-02/assets/114529890/d9264655-98f2-4f4b-8d05-94e374f9c26d)

* Go to Home Page and click on either "Upcoming Trips" or "Posted Ride Offers" to toggle drop down menu
* The general overview of all the rdies within the drop menu will be visible
  * Date of ride, departure time, arrival time, and amount of riders will be displayed for each ride
* Click on any visible ride to access more details about that ride
  * All of the details from the previous page will be displayed, along with driver information, cost breakdown, and option to cancel the ride

Cancelling Ride (Work In Progress)
---------------
![Simulator Screenshot - iPhone 14 Pro - 2023-11-28 at 21 02 17](https://github.com/ucsb-cs184-f23/pj-react-02/assets/114529890/943e6cb4-ca8a-462f-8403-b58f299de16a)

* Go to Home Page and click on either "Upcoming Trips" or "Posted Ride Offers" to toggle drop down menu
* Click on any visible ride to access more details about that ride
* Scroll to the bottom of the page and click on "Cancel Ride" button
* Future Implementation: If the driver presses "Cancel Ride" button, the entire ride is cancelled.
  If a rider presses "Cancel Ride" button, they will be taken off of the ride
  

Accepting Ride (Work In Progress)
---------------
![Simulator Screenshot - iPhone 14 Pro - 2023-11-28 at 21 05 15](https://github.com/ucsb-cs184-f23/pj-react-02/assets/114529890/f3012de2-b06e-4612-88b6-5ea10ee40fde)

* Go to Rides Page to view all of the available rides
* Click on "Accept Ride" button for the ride that you want to join.
* Future Implementation: If a rider presses on "Accept Ride" button, the driver will be notified and they will be added to the ride.
