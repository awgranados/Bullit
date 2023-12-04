import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { firestore } from "../../app/firebaseConfig";
import auth from "../../app/firebaseConfig";

/*
* * * * * Get Ride Offers From rideOffers  * * * * *
*   
*   Grab list of ride offers by driverUserUID
*   sort by nearest departureTime
*   List/s empty if no accepted rides exist 
* 
*/

export default async function getRideOffersByDriver(callback) {
    const user = auth.currentUser;
  
    if (user) {
      const condition = { field: "driverUserUID", operator: "==", value: user.uid };
      const collectionName = "rideOffers";
  
      const collectionRef = query(
        collection(firestore, collectionName),
        where(condition.field, condition.operator, condition.value)
      );
  
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const documents = [];
  
        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
  
      // Sort documents by nearest departure time
      documents.sort((a, b) => {
        const timeA = a.departureTime.toMillis();
        const timeB = b.departureTime.toMillis();
        return timeA - timeB;
      });

        // Call the respective callback function with the latest documents
        callback(documents);
      });
  
      return () => unsubscribe();
    }
  
    // If there's no user, return a function with no effect
    return () => {};
  }