import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import UploadingPhotoTable from './UploadingPhotoTable';

const photoUploadReducer = (state, action) => {
    //console.log("current state in reducer:");
    //console.log(state.files);
    //console.log(action);
    //console.log("the state when this reducer gets called is:")
    //console.log(state)
    //console.log(action)
    

    switch (action.type) {
        case 'START_UPLOAD':
            return {
                ...state,
                uploading: true,
                error: false,
                files: action.files
            };


        case 'UPDATE_PROGRESS':
            return {
                ...state,
                files: state.files.map((file, index) => {
                    if (index===action.index){
                        return {...file, status: action.status};
                    }
                    return file;
                })};
                
        case 'UPLOAD_SUCCESS':
            return {
                ...state,
                files: state.files.map((file, index) => {
                    if (index===action.index){
                        return {...file, status: 'success'};
                    }
                    return file;
                })};
            
        case 'UPLOAD_FAILURE':
            return {
                ...state,
                files: state.files.map((file, index) => {
                    if (index===action.index){
                        return {...file, status: 'error'};
                    }
                    return file;
                })};

        case 'FINISH_UPLOAD':
            return {
                ...state,
                uploading: false
            };

        case 'CLEAR_UPLOADS':
            return {
                ...state,
                files: []
            }

        default:
            return state;
    }
}


const UploadPictures = () => {
    const fileInputRef = React.useRef(null);
    const initialState = {
        files: [],
        uploading: false,
        error: false,
    }
    const [state, dispatchUploadPictures] = React.useReducer(photoUploadReducer, initialState);
    const handleFileSelect = (event) => {
        const filesWithStatus = Array.from(event.target.files).map(file => ({ file, progress: 0, status: "pending" }));

        dispatchUploadPictures({ type: 'START_UPLOAD', files: filesWithStatus });
    };

    const handleRemoveUploads = () => {
        dispatchUploadPictures({ type: 'CLEAR_UPLOADS' });
    };

    const handleRetryUpload = async ({file, index}) => {
        //console.log(file)
        //console.log(index)
        
        await uploadFile({file: state.file[index].file, index})
    };

    //function that handles uploading one file
    const uploadFile = async ({file, index}) => {
        console.log(file)
        dispatchUploadPictures({ type: 'UPDATE_PROGRESS', index: index, status: "Beginning upload" })
        
        const formData = new FormData();
        formData.append('photo', file);

        try {
            const response = await fetch('https://gallery-backend.ccorso.ca/add-photo/', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            dispatchUploadPictures({ type: 'UPLOAD_SUCCESS', index: index })
        }
        catch (errorMessage) {
            dispatchUploadPictures({ type: 'UPLOAD_FAILURE', index: index, error: errorMessage })
        }
    };

    const handleUpload = async () => {
        if (state.files.length == 0) {
            console.log("no files")
            return
        }
        for (let index = 0; index < state.files.length; index++) {
            await uploadFile({ file: state.files[index].file, index });
        }
        dispatchUploadPictures({ type: "FINISH_UPLOAD" });
        //dispatchUploadPictures({ type: "CLEAR_SUCCESSFUL_UPLOADS" });

        //console.log("current ref: ", fileInputRef)
        //if (fileInputRef.current) {
        //    console.log("resetting current ref")
        //    fileInputRef.current.value = '';
        //}
    };
    
    return (
        <Grid
            sx={{ height: "100vh" }}
            container
            alignItems="center"
            columnSpacing={2}
            rowSpacing={2}
            alignSelf="center"
            direction="column"

        >
            <Grid>
                <Typography>Please choose the photos that you want to upload</Typography>
            </Grid>

            <Grid>
                <Input
                    type="file"
                    inputProps={{ multiple: true }}
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                />
            </Grid>

            <Grid>
                <Button variant="contained" onClick={handleUpload}>Upload</Button>
            </Grid>
            <Grid>
                <Button variant="contained" onClick={handleRemoveUploads}>Clear uploads</Button>
            </Grid>
            <Grid>
                <UploadingPhotoTable files={state.files} handleRetryUpload={handleRetryUpload} />
            </Grid>
        </Grid>
    );
};

export default UploadPictures;