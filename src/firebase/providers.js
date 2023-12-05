import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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