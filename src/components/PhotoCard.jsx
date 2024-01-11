import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


const Photo = ({ photoInfo, getPhoto}) => {
    const [imageUrl, setImageUrl] = useState('');
    const [nowPlaying, setNowPlaying] = useState(1);
    //const [videoUrl, setVideoUrl] = useState('');
    const videoRef = useRef(null);

    const togglePlaying = () => {
        if (!nowPlaying && videoRef.current){
            videoRef.current.play();
        }
        setNowPlaying(!nowPlaying);
    }

    useEffect(() => {

        const loadImage = async () => {
            try {
                const photoDetails = await getPhoto(photoInfo);
                if (!photoDetails){
                    throw new Error("photoDetails not found");
                }
                const objectURL = await photoDetails.photoData;
                
                if (objectURL){
                    setImageUrl(objectURL);
                }
                else {
                    throw new Error("Image URL not found");
                }
            }
            catch (error) {
                console.error(`Image with id: %d failed to load`, photoInfo.photo_id);
                console.error("Error:", error);
            }

        }
        //const loadVideo = async () => {
        //    try {
        //        if (photoInfo.motion_photo){
        //            const objectURL = await photodetails
        //        }
        //        else {
        //            return
        //        }
        //    }
        //    catch (error) {
        //        console.error(`Video with id: %d failed to load`, photoInfo.photo_id);
        //        console.error("Error:", error);
        //    }
        //}
        loadImage();
        //loadVideo();

    }, []);

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {imageUrl ? (
                <>
                    {nowPlaying ? (<img src={imageUrl} alt={photoInfo.photo_title} style={{ width: '100%', height: 'auto' }} />)
                    : (<video width="100%" height="auto" ref={videoRef}  controls autoPlay>
                        <source src={"https://gallery-backend.ccorso.ca/get-motion-photo-by-id/" + photoInfo.photo_id + "/"} type="video/mp4"></source>
                    </video>)}
                    

                    <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <a href={"https://gallery-backend.ccorso.ca/get-photo-by-id/" + photoInfo.photo_id + "/"} download={photoInfo.photo_title} target="_blank" rel="noopener noreferrer">

                            <IconButton
                                aria-label="download photo"

                                download={photoInfo.photo_title.replace(/\s/g, '_') + '.jpg'}
                                sx={{ mt: "8px", mr: "8px" }}>
                                <FileDownloadIcon />

                            </IconButton>
                        </a>
                    </Box>

                    {photoInfo.motion_photo ? (<IconButton sx={{position: 'absolute', top:0, left: 0}} onClick={togglePlaying}>
                        <PlayCircleIcon
                            aria-label="play motion photo"
                            sx={{mt:"8px", ml: "8px"}}
                        ></PlayCircleIcon>
                    </IconButton>)
                    :(<></>)}
                    

                    {/*Comment out the below until we get likes working */}
                    {/*<Box sx={{position: 'absolute', top: 0, left: 0}}>
                    <IconButton
                        aria-label="favorite photo"
                        href={"https://gallery-backend.ccorso.ca/favorite-photo-with-id/"+photoInfo.photo_id+"/"}
                        sx={{mt: "8px", ml: "8px"}}>
                            
                        <FavoriteIcon />
                      </IconButton>

                    </Box>
                    */}

                </>)
                : <Skeleton variant='rectangular' width="100%" height="300px" />}
                

        </Box>
    )

};

const PhotoCard = ({ photoInfo, getPhoto}) => (
    <Box>
        <Photo photoInfo={photoInfo} getPhoto={getPhoto} />

    </Box>
)

export default PhotoCard;