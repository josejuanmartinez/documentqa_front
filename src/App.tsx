import {Box, Container} from '@mui/material';
import SearchAppBar from './components/SearchBar';
import {MAIN_SCREEN, UPLOAD} from "./constants/const";
import FileUploader from "./components/FileUploader";
import React, {useRef, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultsVisualizer, {SearchChildRef} from "./components/ResultsVisualizer";

function App() {
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const searchChildRef = useRef<SearchChildRef>(null);

  const changeScreen = (newScreen: number) => {
      setScreen(newScreen);
  }

  const changeSearchResult = (result: any[]) => {
      const mappedResults = result.map(a => [a.answer, a.filename, a.title, a.author, a.page_number, a.total_pages]);
      if (searchChildRef.current != undefined) {
          searchChildRef.current.populateTable(mappedResults);
      }
      console.log(mappedResults);
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
      <SearchAppBar changeScreen={changeScreen} changeResult={changeSearchResult}></SearchAppBar>
      <Container>

        <Box
          className="resultTab"
          hidden={screen != MAIN_SCREEN}
        >
            { screen == MAIN_SCREEN? <ResultsVisualizer ref={searchChildRef}></ResultsVisualizer> : null }
        </Box>
        <Box
            className="resultTab"
            hidden={screen != UPLOAD}
        >
          { screen == UPLOAD? <FileUploader></FileUploader> : null }
        </Box>
      </Container>
    </div>
  );
}

export default App;
