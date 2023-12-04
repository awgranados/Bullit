import { getDoc } from 'firebase/firestore';

// Function to retrieve a Firestore document by reference
export const getRideOfferByReference = async (docRef) => {
  try {
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Document exists, return the data
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
    } else {
      // Document does not exist
      console.error('Document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
  }
};