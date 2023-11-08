import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PhotoCard from './PhotoCard';
import UploadPictures from './UploadForm';

const PhotoGallery = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [photoInfos, setPhotoInfos] = useState([]);

    const increasePageNumber = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1)
    }
    const decreasePageNumber = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 0))
    }

    useEffect(() => {
        console.log(pageNumber)
        fetch('https://gallery-backend.ccorso.ca/get-photo-info-paginated/?page_size=15&page=' + pageNumber)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setPhotoInfos(data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, [pageNumber]);
    return (
        <Box>
            <UploadPictures/>

            <Grid container
                spacing={{ xs: 1, md: 4 }}
                justifyContent="space-around"
                alignItems="center"
            >
                {photoInfos.map((photoInfo) => (
                    <Grid item key={photoInfo.photo_id} xs={12} sm={6} md={4} lg={2}>
                        <PhotoCard photoInfo={photoInfo} key={photoInfo.photo_id} />
                    </Grid>
                ))}
            </Grid>
            <Box>
                <Button onClick={decreasePageNumber} disabled={pageNumber === 0} variant="contained" component="a">-</Button>
                <Typography>Page: {pageNumber + 1}</Typography>
                <Button onClick={increasePageNumber} variant="contained" component="a">+</Button>
            </Box>
        </Box>
    )
}

export default PhotoGallery;