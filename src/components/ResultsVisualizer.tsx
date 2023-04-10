import {Box} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams, GridToolbar} from '@mui/x-data-grid';
import React, {forwardRef, ReactNode, useImperativeHandle, useState} from "react";
import {Style} from "@mui/icons-material";

export interface SearchChildRef {
    populateTable: (arraySearchResults: any, query: string)=> void;
}

interface SearchProps {
    // Declare any other props for the ChildComponent here
}

const ResultsVisualizer = forwardRef<SearchChildRef, SearchProps>((props, ref) => {
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const [queryWords, setQueryWords] = useState<any[]>([]);

    const clean = (value: string): string => {
        let res = value.replace('.','');
        res = res.replace(',','');
        res = res.replace(';','');
        res = res.replace(':','');
        return res;
    }
    const tokenize = (value: string): any[] => {
        return clean(value).split(' ');
    }

    // Expose myFunction to parent component
    useImperativeHandle(ref, () => ({
        populateTable,
    }));

    const isInQuery = (value: string): boolean => {
        return queryWords.findIndex(( item =>  clean(value).toLowerCase() === item.toLowerCase())) !== -1;
    }

    const highlightContent = (params: GridRenderCellParams): ReactNode => {
        const tokens = tokenize(params.value);
        return tokens.map((token, index) => (
            <span className={isInQuery(token)? 'highlighted' : 'unhighlighted'}>{token}</span>
        ));
    }

    const populateTable = (arraySearchResults: any, query: string) => {
        setQuery(query);
        setQueryWords(tokenize(query));
        let searchResultsMap: any[] = [];
        let counter = 0;
        arraySearchResults.forEach((a: any[]) => (searchResultsMap.push({
            'id': counter++,
            'answer': a[0],
            'filename': a[1],
            'title': a[2],
            'author': a[3],
            'page_num': a[4] + "/" + a[5],
        })));
        setSearchResult(searchResultsMap);
    }

    const columns: GridColDef[] = [
        {field: 'answer', headerName: 'Text', flex: 1, renderCell: (params) => {
                return highlightContent(params);}
            },
        {field: 'filename', headerName: 'Filename', width: 100, flex: 0.1},
        {field: 'title', headerName: 'Title', width: 100, flex: 0.1},
        {field: 'author', headerName: 'Author', width: 100, flex: 0.1},
        {field: 'page_num', headerName: 'Page', width: 30, flex: 0.1},
    ];

    return <Box
        className="resultsBox"
    >
        <div>
            <DataGrid
                rows={searchResult}
                columns={columns}
                autoHeight={true}
                rowHeight={100}
                slots={{ toolbar: GridToolbar }}
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
                            page_num: false
                        },
                    },
                }}
            />
        </div>
    </Box>

});

export default ResultsVisualizer;