import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SelectedMenu from "./Menu";

export default function TopBar(
    {changeScreen}: {changeScreen: (index: number) => void}
) {

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

    </Toolbar>
    </AppBar>
    </Box>
);
}
