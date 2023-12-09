import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

 
 const googleProvider = new GoogleAuthProvider();

 export const singInWithGoogle = async() => {

    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider );// mostramos el popup y elegimos el usuario
        // const credentials = GoogleAuthProvider.credentialFromResult( result );// solo mostramos el resultado
        // console.log({ credentials });
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        // console.log(error);
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage, 
        }
        
    }
 }


 export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        
        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

 }

 export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return{
            ok: true,
            uid, photoURL, displayName  
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }        
    }

 }