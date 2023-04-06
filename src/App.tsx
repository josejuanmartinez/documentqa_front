import {Box, Container} from '@mui/material';
import SearchAppBar from './components/SearchBar';
import {DOCUMENT_PREVIEW, NO_SCREEN, UPLOAD} from "./constants/const";
import FileUploader from "./components/FileUploader";
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notify from "./utils/notifications";
import {TypeOptions} from "react-toastify/dist/types";

function App() {
  const [screen, setScreen] = useState(NO_SCREEN);

  const changeScreen = (newScreen: number) => {
      setScreen(newScreen);
  }

  return (
    <div className="allApp">
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
      <SearchAppBar changeScreen={changeScreen}></SearchAppBar>
      <Container>

        <Box
          className="resultTab"
          hidden={screen != NO_SCREEN}
        >
        </Box>
        <Box
            className="resultTab"
            hidden={screen != UPLOAD}
        >
          { screen == UPLOAD? <FileUploader></FileUploader> : null }
        </Box>
        <Box
            className="resultTab"
            hidden={screen != DOCUMENT_PREVIEW}
        >
          {/*<DocumentPreview response={response} />*/}
        </Box>
      </Container>
    </div>
  );
}

export default App;
