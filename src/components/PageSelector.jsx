import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CachedIcon from '@mui/icons-material/Cached';

const PageSelector = ({ increasePageNumber, decreasePageNumber, pageNumber, toggleFavoritePhotos, direction, toggleReprocessPhotos }) => {
    let order =""
    if (direction == "column") order = "column";
    else if (direction == "column-reverse") order = "column-reverse";
    else order = "column";

    return (
        <Grid container alignItems="center" direction={order} width="100%" rowSpacing={1}>

            <Grid  container spacing={2}>
                <Grid>
                    <Button onClick={decreasePageNumber} disabled={pageNumber === 0} variant="contained" component="a">-</Button>
                </Grid>
                <Grid>
                    <Typography>Page: {pageNumber + 1}</Typography>
                </Grid>
                <Grid>
                    <Button onClick={increasePageNumber} variant="contained" component="a">+</Button>
                </Grid>
            </Grid>

            <Grid container spacing={2}>

                <Grid>
                    <Button onClick={toggleFavoritePhotos} variant="outlined" startIcon={<FavoriteBorder />}>Favorite Photos</Button>
                </Grid>
                <Grid>
                    <Button onClick={toggleReprocessPhotos} variant="outlined" startIcon={<CachedIcon />}>Reprocess Photos</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PageSelector;