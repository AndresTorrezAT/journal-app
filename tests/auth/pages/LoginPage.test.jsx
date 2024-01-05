const { render, screen, fireEvent } = require('@testing-library/react');
const { Provider } = require('react-redux'); // se debe de proporcionar un store 
const { configureStore } = require('@reduxjs/toolkit'); // se añade el store
const { MemoryRouter } = require('react-router'); // proporciona todo para renderizar en memoria, por que un codigo necesita de router para funcionar

const { LoginPage } = require('../../../src/auth/pages/LoginPage');
const { authSlice } = require('../../../src/store/auth');
const { startGoogleSignIn } = require('../../../src/store/auth/thunks');
const { notAuthenticatedState } = require('../../fixtures/authFixtures');


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn, // aca definimos que funcion quiero que haga el mock
    startLoginWithEmailPassword: ({ email, password }) => { 
        return () => mockStartLoginWithEmailPassword({ email, password });
    }, // ahora s existe esta funcion, en total 2
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'), // obtienes todas la funciones originales
    // useDispath: () => { // FORMA 1
    //     return (fn) => fn() //retorna una funcion que devuelve una funcion
    // },
    // FORMA 2
    useDispatch: () => (fn) => fn(), // recibe una funcion y lo mandamos a llamar
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState //esto se usa para que cambiemos el estado
    }
})

describe('Pruebas en <LoginPage />', () => { 

    beforeEach(() => jest.clearAllMocks() );

    test('debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('boton de google debe de llamar el startGoogleSignIn', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );
        // console.log(store.getState()); // para comprobar los valroes del store
        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    })

    test('submit debe de llamar startLoginWithEmailPassword', () => {

        const email = 'fernando@google.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } });
        // console.log(emailField);
        // screen.debug();  
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });
        
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm ); // click en el submit y deberiamos ver el console log

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password,
        });

    });

});