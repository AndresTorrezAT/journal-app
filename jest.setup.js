// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
// import { getEnvironments } from './src/helpers/getEnvironments';
// import 'setimmediate';

require('dotenv').config({ // cargar este env
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({ // un mock para el lado de testing backend

    getEnvironments: () => ({ ...process.env })
}));
