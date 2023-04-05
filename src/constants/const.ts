import {createTheme} from "@mui/material/styles";
import {green, purple} from "@mui/material/colors";

export const SERVER_URL = 'http://localhost:5000';
export const NO_SCREEN: number = 0
export const UPLOAD: number = 1
export const DOCUMENT_PREVIEW: number = 3

export const custom_theme_1 = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

