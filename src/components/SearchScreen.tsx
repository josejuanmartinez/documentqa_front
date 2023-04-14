import {ProcessQuery} from "../api/api";
import {OK, RESULTS_SCREEN} from "../constants/const";
import {toast} from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import LoopIcon from "@mui/icons-material/Loop";
import * as React from "react";
import {Box} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {useState} from "react";
import Notify from "../utils/notifications";
import {features} from "../constants/features";
import {KeyboardReturn, KeyboardReturnOutlined, KeyboardReturnTwoTone} from "@mui/icons-material";
import {Tooltip} from "@mui/joy";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    /*[theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },*/
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        //transition: theme.transitions.create('width'),
        width: '100%',
        /*[theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '75ch',
            },
        },*/
    },

}));

const SearchIconEndWrapper = styled('div')(({ theme }) => ({
    top: '7px',
    right: '0px',
    position: 'absolute',
    display: 'block',
    alignSelf: 'right',
    alignItems: 'right',
    justifyContent: 'right',
}));

export default function SearchScreen(
    {changeScreen, changeResult, query, changeQuery}:
        {
            changeScreen: (index: number) => void,
            changeResult: (result: any[]) => void,
            changeQuery: (query: string) => void,
            query: string}
) {

    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    const triggerSearch = async (): Promise<void> => {
        // CALL TO API
        const formData = new FormData();
        formData.append("question", searchText);
        formData.append("generate_answer", features["generateAnswer"].toString());

        setLoading(true);
        const res = await ProcessQuery(formData);
        setLoading(false);
        if (res.code == OK) {
            Notify(toast.TYPE.SUCCESS, "Rendering search results");
        } else {
            Notify(toast.TYPE.ERROR, res.message);
        }
        changeResult(res.result);
        changeScreen(RESULTS_SCREEN);
    }
    const handleKeyUp = async (event: any) => {
        if (event.key === 'Enter') {
            triggerSearch();
        }
    }

    const handleChange = (event: any) => {
        setSearchText(event.target.value);
        changeQuery(event.target.value);
    }

    return (
        <Box className="resultTabScreen">
            <Search className="searchWidget">
                <SearchIconWrapper>
                    {loading ?
                        <LoopIcon
                            sx={{
                                animation: "spin 2s linear infinite",
                                "@keyframes spin": {
                                    "0%": {
                                        transform: "rotate(360deg)",
                                    },
                                    "100%": {
                                        transform: "rotate(0deg)",
                                    },
                                },
                            }}
                        /> : <SearchIcon /> }
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder={query? query : 'Search...'}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    className="searchInput"
                />
                <SearchIconEndWrapper>
                    <Tooltip title="Press `enter` to search"><KeyboardReturnOutlined color="disabled" onClick={triggerSearch} cursor="pointer"/></Tooltip>
                </SearchIconEndWrapper>

            </Search>

        </Box>);
}