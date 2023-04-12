import {Box, Container} from '@mui/material';
import TopBar from './components/TopBar';
import {MAIN_SCREEN, RESULTS_SCREEN, UPLOAD_SCREEN} from "./constants/const";
import FileUploader from "./components/FileUploader";
import React, {useRef, useState} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResultsVisualizer, {SearchChildRef} from "./components/ResultsVisualizer";
import SearchScreen from "./components/SearchScreen";

function App() {
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const searchChildRef = useRef<SearchChildRef>(null);
  const [query, setQuery] = useState("");

  const changeScreen = (newScreen: number) => {
      setScreen(newScreen);
  }
  const changeQuery = (newQuery: string) => {
    setQuery(newQuery);
  }

  const changeSearchResult = (result: any) => {
      const answers: any[] =result['answers'];
      const contextedAnswer: string = result['contexted_answer'];
      const mappedResults = answers.map(a => [a.answer, a.filename, a.title, a.author, a.page_number,
                                                    a.total_pages, a.distance, a.is_relevant]);
      if (searchChildRef.current != undefined) {
          searchChildRef.current.populateTable(mappedResults, contextedAnswer, query);
      }
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
      <TopBar changeScreen={changeScreen}></TopBar>
      <Container>

        <Box
          className="searchTab"
          hidden={screen != MAIN_SCREEN}
        >
            <SearchScreen changeScreen={changeScreen} changeResult={changeSearchResult} query={query}
                          changeQuery={changeQuery}></SearchScreen>
        </Box>
        <Box
            className="uploadab"
            hidden={screen != UPLOAD_SCREEN}
        >
          <FileUploader changeScreen={changeScreen} ></FileUploader>
        </Box>
          <Box
              className="resultTab"
              hidden={screen != RESULTS_SCREEN}
          >
              <SearchScreen changeScreen={changeScreen} changeResult={changeSearchResult} query={query}
                            changeQuery={changeQuery}></SearchScreen>
              <ResultsVisualizer ref={searchChildRef}></ResultsVisualizer>
          </Box>
      </Container>
    </div>
  );
}

export default App;
