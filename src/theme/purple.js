import { createTheme } from '@mui/system';
import { red } from '@mui/material/colors';


export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#232254'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }

})
