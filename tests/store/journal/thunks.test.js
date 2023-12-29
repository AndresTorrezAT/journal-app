import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";

import { startNewNote } from "../../../src/store/journal";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal thunks', () => { 
    
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe de crear una nueva nota en blanco', async() => { 

        const uid = 'TEST-UID';    
        getState.mockReturnValue({ auth: { uid: uid }}); // el valor que devolvera en caso de  ser llamada ! no es una promesa por que es syncrono

        await startNewNote()( dispatch, getState ); // dara error por que para grabar en firebase tengo que authenticarme
        // SE AÑADIO UNA NUEVA BASE DE DATOS DE TEST

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number ),
        }));
        
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number ),
        }));

        //Borrar notas de fire base
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
        const docs = await getDocs( collectionRef )

        // console.log( docs );
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) ); // eliminamos el documento con su referencia
        await Promise.all( deletePromises );

    });

});