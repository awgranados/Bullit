import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../app/firebaseConfig';

export const getUserDetails = async (uid) => {

    try {
        const userDocRef = doc(firestore, 'userDetails', uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // Document with the specified UID exists
            const userDetails = userDocSnapshot.data();
            return userDetails;
    } else {
        // Document with the specified UID does not exist
        console.log('User Details not found');
        return null;
    }
    } catch (error) {
    console.error('Error fetching user details:', error);
    }
};