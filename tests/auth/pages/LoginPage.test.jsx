const { render, screen, fireEvent } = require("@testing-library/react");
const { Provider } = require("react-redux"); // se debe de proporcionar un store 
const { configureStore } = require("@reduxjs/toolkit"); // se añade el store
const { MemoryRouter } = require("react-router"); // proporciona todo para renderizar en memoria, por que un codigo necesita de router para funcionar

const { LoginPage } = require("../../../src/auth/pages/LoginPage");
const { authSlice } = require("../../../src/store/auth");
const { notAuthenticatedState } = require("../../fixtures/authFixtures");

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState //esto se usa para que cambiemos el estado
    }
})

describe('Pruebas en <LoginPage />', () => { 

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

    })

});