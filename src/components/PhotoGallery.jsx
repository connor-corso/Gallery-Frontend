import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PhotoCard from './PhotoCard';


const PhotoGallery = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [photoInfos, setPhotoInfos] = useState([]);

    useEffect(() => {
        fetch('https://gallery-backend.ccorso.ca/get-photo-info-paginated/?page_size=30&page=' + pageNumber)
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
                <button>-</button>
                <Typography></Typography>
                <button>+</button>
            </Box>
        </Box>
    )
}

export default PhotoGallery;