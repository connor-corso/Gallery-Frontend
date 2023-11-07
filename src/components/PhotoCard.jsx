import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PhotoCaption = ({ photoInfo }) => (
    <Box>
        <Typography variant="p" component="p" >
            {photoInfo.photo_title}
        </Typography>
        {photoInfo.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Box>

)

const Photo = ({ photoInfo }) => {
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        
        fetch('https://gallery-backend.ccorso.ca/get-photo-by-id/' + photoInfo.photo_id + "/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then((blob) => {
                const objectURL = URL.createObjectURL(blob);
                setImageUrl(objectURL);
            })
            .catch((error) => {
                console.error('Image with id: %d was unable to be loaded', photoInfo.photo_id)
                console.error('Error:', error)
            });

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, []);
    return (
        <Box sx={{width: '100%', height: '100%'}}>
            {imageUrl ? <img src={imageUrl} alt={photoInfo.photo_title} style={{width: '100%', height: 'auto'}}/> : <p>Loading image...</p>}
        </Box>
    ) 

};

const PhotoCard = ({ photoInfo }) => (
    <Box>
        <Photo photoInfo={photoInfo} />
        <PhotoCaption photoInfo={photoInfo} />
    </Box>
)

export default PhotoCard;