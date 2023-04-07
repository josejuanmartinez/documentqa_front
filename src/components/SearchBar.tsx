import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoopIcon from '@mui/icons-material/Loop';
import SelectedMenu from "./Menu";
import {KeyboardEventHandler, useState} from "react";
import {MAIN_SCREEN, OK, SEPARATORS} from "../constants/const";
import {ProcessDocument, ProcessQuery} from "../api/api";
import Notify from "../utils/notifications";
import {toast} from "react-toastify";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '200%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
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
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '75ch',
            },
        },
    },

}));

export default function SearchAppBar(
    {changeScreen, changeResult}: {changeScreen: (index: number) => void, changeResult: (result: any[]) => void}
) {

    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleKeyUp = async (event: any) => {

        if (event.key === 'Enter') {
            // CALL TO API
            const formData = new FormData();
            formData.append("question", searchText);
            setLoading(true);
            const res = await ProcessQuery(formData);
            setLoading(false);
            if (res.code == OK) {
                Notify(toast.TYPE.SUCCESS, "Rendering search results");
            } else {
                Notify(toast.TYPE.ERROR, res.message);
            }
            changeResult(JSON.parse(res.result));
            //changeResult(res.result);
            changeScreen(MAIN_SCREEN);
        }
    }

    const handleChange = (event: any) => {
        setSearchText(event.target.value);
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
    <Toolbar>
        <SelectedMenu changeScreen={changeScreen}/>
    <Typography
    variant="h6"
    noWrap
    component="div"
    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
>

    <nav style={{ padding: 20 }}>
        <div className="sintetic">sintetic.ai</div>
    </nav>
    </Typography>
    <Search>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
        />
    </Search>
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
        /> : '' }
    </Toolbar>
    </AppBar>
    </Box>
);
}
