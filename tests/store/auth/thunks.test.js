import { checkingCredentials } from '../../../src/store/auth';
import { checkingAuthentication } from '../../../src/store/auth/thunks';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en Auththunks', () => {
    
    const dispatch = jest.fn(); //una funcion de prueba, SUPLANTA UNA REAL
    beforeEach( () => jest.clearAllMocks() );
    
    test('debe de invocar el checkingCredentials', async () => {

        await checkingAuthentication()( dispatch ); // manda a llamar la funcion de retorno
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    })
})