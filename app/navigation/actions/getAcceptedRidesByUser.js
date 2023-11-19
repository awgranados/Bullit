import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../../app/firebaseConfig";

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

        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
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
