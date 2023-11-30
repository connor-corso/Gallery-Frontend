import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

const PageSelector = ({increasePageNumber, decreasePageNumber, pageNumber}) => {
    return (
        <Grid container spacing={2}>
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
    )
}

export default PageSelector;