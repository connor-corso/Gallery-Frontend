import * as React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CollectionsIcon from '@mui/icons-material/Collections';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid>
                    <Link to="/">
                    <HomeIcon />
                    </Link>
                </Grid>
                <Grid>
                    <Link to="/upload">
                    <CloudUploadIcon />
                    </Link>
                </Grid>
                <Grid>
                <Link to="/galleries">

                    <CollectionsIcon />
                </Link>
                </Grid>
                <Grid>
                <Link to="/favorites">

                    <FavoriteIcon />
                </Link>
                </Grid>
                <Grid>
                <Link to="/settings">
                    <SettingsIcon />

                </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default NavBar