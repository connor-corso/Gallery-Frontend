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
            <Grid container spacing={5}>
                <Grid xs={0.5} display="flex" justifyContent="center" alignItems="center" sx={{ paddingLeft: 6, paddingRight: 4 }}>
                    <img src="motionphotosextractoricon.png" height="auto" width="60px" />
                </Grid>
                <Grid xs={0.5} display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{
                        width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: "center", '&:hover': {
                            backgroundColor: 'lightgray'
                        }
                    }}>

                        <Link to="/" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: "center" }}>

                            <HomeIcon color="primary" />

                        </Link>
                    </Box>
                </Grid>
                <Grid xs={0.5} display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{
                        width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: "center", '&:hover': {
                            backgroundColor: 'lightgray'
                        }
                    }}>

                        <Link to="/upload" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <CloudUploadIcon color="primary" />
                        </Link>
                    </Box>
                </Grid>
                <Grid xs={0.5} display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{
                        width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: "center", '&:hover': {
                            backgroundColor: 'lightgray'
                        }
                    }}>

                        <Link to="/favorites">

                            <FavoriteIcon color="primary" />
                        </Link>
                    </Box>
                </Grid>


                {/* <Grid xs={0.5} display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{
                        width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: "center", '&:hover': {
                            backgroundColor: 'lightgray'
                        }
                    }}>

                        <Link to="/galleries">

                            <CollectionsIcon color="primary"/>
                        </Link>
                    </Box>
                </Grid>

                <Grid xs={0.5} display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{
                        width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: "center", '&:hover': {
                            backgroundColor: 'lightgray'
                        }
                    }}>

                        <Link to="/settings">
                            <SettingsIcon color="primary"/>

                        </Link>
                    </Box>
                </Grid>
                        */}
            </Grid>
        </Box>
    );
}

export default NavBar