import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Apps from '@mui/icons-material/Apps';
import {MAIN_SCREEN, RESULTS_SCREEN, UPLOAD_SCREEN} from "../constants/const";

export default function SelectedMenu({changeScreen}: {changeScreen: (index: number) => any}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(MAIN_SCREEN);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const createHandleClose = (index: number) => () => {
        setAnchorEl(null);
        if(index != -1) {
            setSelectedIndex(index);
            changeScreen(index);
        }
    };

    return (
        <div>
            <Button
                id="selected-demo-button"
                aria-controls={open ? 'selected-demo-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                color="neutral"
                onClick={handleClick}
                startDecorator={<Apps />}
            >
            </Button>
            <Menu
                id="selected-demo-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={createHandleClose(-1)}
                aria-labelledby="selected-demo-button"
            >
                <MenuItem
                    {...(selectedIndex === MAIN_SCREEN && { selected: true, variant: 'soft' })}
                    onClick={createHandleClose(MAIN_SCREEN)}
                >
                    Search
                </MenuItem>
                <MenuItem
                    {...(selectedIndex === UPLOAD_SCREEN && { selected: true, variant: 'soft' })}
                    onClick={createHandleClose(UPLOAD_SCREEN)}
                >
                    Index
                </MenuItem>
                <MenuItem
                    {...(selectedIndex === RESULTS_SCREEN && { selected: true, variant: 'soft' })}
                    onClick={createHandleClose(RESULTS_SCREEN)}
                >
                    Visualize
                </MenuItem>
            </Menu>
        </div>
    );
}