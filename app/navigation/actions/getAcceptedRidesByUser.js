import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../../app/firebaseConfig";

/*
* * * * * Get Accepted Rides From acceptedPassengerRides and  * * * * *
*                  acceptedDriverRides with User UID
*   
*   Grab list of accepted rides as passenger from acceptedPassengerRides
*   Grab list of accepted rides with at least one seat taken where current user
*        is the driver
*   List/s empty if no accepted rides exist 
* 
*/

export default async function getAcceptedRidesByUser(callbacks) {
  const user = auth.currentUser;
  const unsubscribes = [];

  if (user) {
    const conditions = [
      { field: "passengerUserUID", operator: "==", value: user.uid },
      { field: "driverUserUID", operator: "==", value: user.uid },
    ];
    const collections = ["acceptedPassengerRides", "acceptedDriverRides"];
    collections.forEach((collectionName, index) => {
      const collectionRef = query(
        collection(firestore, collectionName),
        where(
          conditions[index].field,
          conditions[index].operator,
          conditions[index].value
        )
      );

      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const documents = [];
        let isDriver = false;
        if (collectionName === "acceptedDriverRides") isDriver = true;

        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            isDriver: isDriver,
            ...doc.data(),
          });
        });

        // Call the respective callback function with the collection name and the latest documents
        callbacks[index](documents);
      });

      unsubscribes.push(unsubscribe);
    });

    // Return an array of unsubscribe functions
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }
}
