import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyANKsjZjnJB9MtAuQRNhv1DFdHJaI56a_4",
    authDomain: "oc-shop-db.firebaseapp.com",
    databaseURL: "https://oc-shop-db.firebaseio.com",
    projectId: "oc-shop-db",
    storageBucket: "oc-shop-db.appspot.com",
    messagingSenderId: "715960680315",
    appId: "1:715960680315:web:3b38299c2d8700cbb787de",
    measurementId: "G-W1146JLM2K"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;

        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;