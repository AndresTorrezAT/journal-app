import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from '../../../src/firebase/providers'; // ESTE LO LLAMA
import { checkingCredentials, login, logout, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth';
import { checkingAuthentication } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers'); // ESTE LO VUELVE MOCK

describe('Pruebas en Auththunks', () => {
    
    const dispatch = jest.fn(); //una funcion de prueba, SUPLANTA UNA REAL
    beforeEach( () => jest.clearAllMocks() );
    
    test('debe de invocar el checkingCredentials', async () => {

        await checkingAuthentication()( dispatch ); // manda a llamar la funcion de retorno
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {

        const loginData = { ok: true, ...demoUser};
        await singInWithGoogle.mockResolvedValue( loginData );
    
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() ); // el primner dispatch
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) ); // el segundo dispatch

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en Google'}; // LA RESPUESTA QUE SE ESPERA DE LA FUNCION DE ABAJO
        await singInWithGoogle.mockResolvedValue( loginData ); // MOCK PARA PROMESAS
        
        //THUNK
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() ); // el primner dispatch
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) ); // el segundo dispatch

    });


    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => { 

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456'};

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login( loginData ) );

     });

     test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

     })

});

