import {Box} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams, GridToolbar} from '@mui/x-data-grid';
import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useState} from "react";
import {NLTK_ENGLISH, OK} from "../constants/const";
import {Lemmatize, LemmatizeAndRemoveStopwords} from "../api/api";
import Notify from "../utils/notifications";
import {toast} from "react-toastify";

export interface SearchChildRef {
    populateTable: (arraySearchResults: any, contextedAnswer: string, query: string)=> void;
}

interface SearchProps {
    // Declare any other props for the ChildComponent here
}

const ResultsVisualizer = forwardRef<SearchChildRef, SearchProps>((props, ref) => {
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const [queryWords, setQueryWords] = useState<any[]>([]);
    const [highlightedWords, setHighlightedWords] = useState<any[]>([]);
    const [displayedContent, setDisplayedContent] = useState("");

    const [index, setIndex] = useState(0)
    const speed=10;

    const TypeAnswer =  ( (answer: string) => {
        let counter = 0;
        const animKey = setInterval(() => {
            if (answer.length >= counter) {
                setDisplayedContent(answer.slice(0, counter))
                counter++;
            }
            if (answer.length < counter) {
                clearInterval(animKey);
            }
        }, speed);
    })

    useEffect( () => {
        async function calculateHighlightedWords() {
            setHighlightedWords([]);
            for (const a of searchResult) {
                const res = a["answer"];
                const cleanRes = clean(res);
                const formData = new FormData();
                formData.append("text", cleanRes);
                formData.append("lan", NLTK_ENGLISH);
                await Lemmatize(formData).then(data => {
                        const tokens = tokenize(unifySpaces(data.result));
                        tokens.forEach((t: string) => {
                            if (isInQuery(t)) {
                                highlightedWords.push(t);
                            }
                        });
                    }
                );
            }
        }
        calculateHighlightedWords();
    }, [query]);

    const calculateQueryWords = async (text: string): Promise<void> => {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("lan", NLTK_ENGLISH);
        const res = await LemmatizeAndRemoveStopwords(formData);
        let finalRes = text;
        if (res.code == OK) {
            finalRes = res.result;
        } else {
            Notify(toast.TYPE.ERROR, res.message);
        }
        setQueryWords(tokenize(unifySpaces(finalRes)));
    }

    const unifySpaces = (value: string): string => {
        return value.replace(/[\t\n ]+/g, ' ');
    }

    const clean = (value: string): string => {
        return unifySpaces(value.replace(/[^a-zA-Z \s]/g, ''));
    }

    const tokenize = (value: string): any[] => {
        return value.split(' ').filter( token => token.trim() != '');
    }

    // Expose myFunction to parent component
    useImperativeHandle(ref, () => ({
        populateTable,
    }));

    const isInQuery = (value: string): boolean => {
        return queryWords.findIndex(( item =>  clean(value).toLowerCase() === clean(item).toLowerCase())) !== -1;
    }

    const highlightContent = (params: GridRenderCellParams): ReactNode => {
        const tokens  = tokenize(clean(params.value));
        const res = [];
        let counter = 0;
        res.push(<span key={counter++} className="unrelevant_icon">&darr;</span>);
        tokens.map((token, index) => ( res.push(
            <span key={counter++} className={isInQuery(token) ? 'highlighted' : 'unhighlighted'}>{token}</span>)
        ));
        return res;
    }

    const populateTable = (arraySearchResults: any, answer: string, query: string) => {
        calculateQueryWords(query).then(r => {
            let searchResultsMap: any[] = [];
            let counter = 0;
            arraySearchResults.forEach((a: any[]) => (searchResultsMap.push({
                'id': counter++,
                'key': counter++,
                'answer': a[0],
                'filename': a[1],
                'title': a[2],
                'author': a[3],
                'page_num': a[4] + "/" + a[5],
                'distance': a[6],
                'is_relevant': a[7]
            })));
            let highlightedWords: string[] = []

            setHighlightedWords(highlightedWords);
            setSearchResult(searchResultsMap);
            setQuery(query);
            setDisplayedContent("");
            TypeAnswer(answer);
        });
    }

    const columns: GridColDef[] = [
        {field: 'answer', headerName: 'Text', flex: 1, renderCell: (params) => {
                return highlightContent(params);}
            },
        {field: 'filename', headerName: 'Filename', width: 100, flex: 0.1},
        {field: 'title', headerName: 'Title', width: 100, flex: 0.1},
        {field: 'author', headerName: 'Author', width: 100, flex: 0.1},
        {field: 'page_num', headerName: 'Page', width: 30, flex: 0.1},
        {field: 'distance', headerName: 'Distance', width: 30, flex: 0.1},
        {field: 'is_relevant', headerName: 'Relevant', width: 30, flex: 0.1},
    ];

    return <Box
        className="resultsBox"
    >
            <pre className="type-writer">{displayedContent}</pre>
            <DataGrid
                rows={searchResult}
                columns={columns}
                autoHeight={true}
                rowHeight={100}
                slots={{ toolbar: GridToolbar }}
                getRowClassName={(params) => {
                    return params.row.is_relevant ? "relevant" : "unrelevant";
                }}
                sx={{
                    boxShadow: 0,
                    border: 0,
                    borderColor: 'transparent',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.light',
                    },
                }}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            // Hide columns status and traderName, the other columns will remain visible
                            answer: true,
                            filename: false,
                            title: false,
                            author: false,
                            page_num: false,
                            distance:false,
                            is_relevant:false
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'distance', sort: 'asc' }],
                    },
                }}
            />
    </Box>

});

export default ResultsVisualizer;