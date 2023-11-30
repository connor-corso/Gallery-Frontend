import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import PhotoCard from './PhotoCard';
import UploadPictures from './UploadForm';
import Box from '@mui/material/Box';
import PageSelector from './PageSelector';

const photosReducer = (state, action) => {
    //console.log("Current State: ", state)
    //console.log("Current Action: ", action)

    // create a new state variable for the cases where we modify it directly before returning it
    let newState = {};

    switch (action.type) {
        // This sets the isloading and isError to 
        case 'PHOTOS_IMAGE_FETCH_INIT':
            return {
                ...state,
                [action.payload.photoInfo.photo_id]: {
                    isLoading: true,
                    hasError: false,
                    photoData: null,
                    errorMessage: null
                }
            };

        // This takes a payload.id and a payload.image and stores the payload.image
        case 'PHOTOS_ADD_IMAGE_SUCCESS':
            newState = {
                ...state,
                [action.payload.photoInfo.photo_id]: {
                    isLoading: false,
                    hasError: false,
                    photoData: action.payload.photoData,
                    errorMessage: null
                }
            };

            return newState

        // This sets the isloading to false and isError to true on an error loading a photo
        case 'PHOTOS_ADD_IMAGE_FAILURE':
            return {
                ...state,
                [action.payload.photoInfo.photo_id]: {
                    isLoading: false,
                    hasError: true,
                    photoData: null,
                    errorMessage: action.payload.errorMessage
                }
            }
        // This takes a payload.id and a payload.image and wipes out the old image and throws a new one in its spot
        case 'PHOTOS_UPDATE_IMAGE':
            return {
                ...state,
                [action.payload.photoInfo.photo_id]: {
                    isLoading: false,
                    hasError: false,
                    photoData: action.payload.photoData,
                    errorMessage: null
                }
            };
        case 'PHOTOS_REMOVE_IMAGE':
            newState = { ...state };
            if (newState[action.payload.photoInfo.photo_id]) {
                URL.revokeObjectURL(newState[action.payload.photoInfo.photo_id])
            }
            delete newState[action.payload.photoInfo.photo_id];

            return newState;

        case 'SET_PAGE':
            return {
                ...state,
                pageNumber: action.payload.pageNumber
            }
        case 'PHOTO_INFOS_FETCH_SUCCESS':
            newState = { ...state };
            delete newState.photoInfos;
            return {
                ...state,
                // replace the photoInfos that are there with new ones to make it easier to render only the images in that page
                photoInfos: action.payload.photo_infos
            }
        
        default: 
            return state;
    }
}

// fetches the photo with photo_id = photoInfo.photo_id. I have no idea how to clean up the photo when you're done with it...
/* This is clipped from somewhere else, I'm not too sure where to even put this, maybe in the reducer
return () => {
    if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
    }
};
*/
const fetchPhoto = async (photosState, photoInfo, dispatchPhotos) => {
    try {
        const response = await fetch("https://gallery-backend.ccorso.ca/get-thumbnail-by-id/" + photoInfo.photo_id + "/")
        if (!response.ok) {
            dispatchPhotos({ type: 'PHOTOS_ADD_IMAGE_FAILURE', payload: { photoInfo: photoInfo } })
            throw new Error('Request failed, response was not ok')
        }
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);

        //dispatchPhotos does not instantly add the photo to the photosState so we should just return what would be there, it will work correctly on updating the component
        dispatchPhotos({ type: 'PHOTOS_ADD_IMAGE_SUCCESS', payload: { photoInfo: photoInfo, photoData: objectURL } })

        return { isLoading: false, hasError: false, photoData: objectURL, errorMessage: null };


    }
    catch (error) {
        console.error('Image with id: %d failed to load', photoInfo.photo_id);
        console.error('Error: ', error);
    }
};

// Looks in the photosState to see if the image has already been downloaded and if so returns that, otherwise it fetches the photo from the api
//const getPhoto = async (photosState, photoInfo) => {
//    if (photosState.hasOwnProperty(photoInfo.photo_id)){
//        return photosState[photoInfo.photo_id]
//    }
//    return fetchPhoto(photosState, photoInfo);
//};

const PhotoGallery = () => {
    const initialState = {
        photoInfos: [],
        pageNumber: 0,
        error: null
    };
    const [photosState, dispatchPhotos] = React.useReducer(
        photosReducer,
        initialState
    );

    const increasePageNumber = () => {
        dispatchPhotos({ type: 'SET_PAGE', payload: { pageNumber: photosState.pageNumber + 1 } })
    }
    const decreasePageNumber = () => {
        dispatchPhotos({ type: 'SET_PAGE', payload: { pageNumber: Math.max(photosState.pageNumber - 1, 0) } })
    }


    const getPhoto = async (photoInfo) => {
        let photoDetails = {}
        if (photosState.hasOwnProperty(photoInfo.photo_id)) {
            photoDetails = photosState[photoInfo.photo_id];

        }
        else {
            photoDetails = await fetchPhoto(photosState, photoInfo, dispatchPhotos);
        }

        return photoDetails;
    }
    useEffect(() => {
        const loadPhotoInfos = async () => {
            try {
                //const response = await fetch('https://gallery-backend.ccorso.ca/get-photo-info-paginated/?page_size=1&page=' + photosState.pageNumber); //for debugging use this line to only load one picture at a time
                const response = await fetch('https://gallery-backend.ccorso.ca/get-photo-info-paginated/?page_size=24&page=' + photosState.pageNumber);

                if (!response.ok) {
                    throw new Error("Failed to load a page of photo infos")
                }
                const responseJson = await response.json();

                dispatchPhotos({ type: 'PHOTO_INFOS_FETCH_SUCCESS', payload: { photo_infos: responseJson } })
            }
            catch (error) {
                //dispatchPhotos({ type: 'PHOTO_INFOS_FETCH_FAILURE' })
                console.log('Error fetching page %d of photo infos, probably due to the page not existing', error);
                decreasePageNumber();
            }

        }
        loadPhotoInfos();
    }, [photosState.pageNumber]);

    return (
        <Grid container
            spacing={0}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            rowGap={2}
        >
            

            <PageSelector increasePageNumber={increasePageNumber} decreasePageNumber={decreasePageNumber} pageNumber={photosState.pageNumber} />
            

            <Grid container
                spacing={1}
                justifyContent="space-around"
                alignItems="center"
            >
                {photosState.photoInfos.map((photoInfo) => (
                    <Grid item key={photoInfo.photo_id} xs={6} sm={6} md={4} lg={3} xl={2}>
                        <PhotoCard
                            photoInfo={photoInfo}
                            key={photoInfo.photo_id}
                            photosState={photosState}
                            getPhoto={getPhoto}
                        />
                    </Grid>
                ))}
            </Grid>
            <PageSelector increasePageNumber={increasePageNumber} decreasePageNumber={decreasePageNumber} pageNumber={photosState.pageNumber} />
        </Grid>
    )
}

export default PhotoGallery;