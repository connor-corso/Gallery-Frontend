import { Button, Input, Box } from '@mui/material';
import React, { useState } from 'react';

const UploadPictures = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    //function that handles the file selection
    const handleFileSelect = (event) => {
        setSelectedFiles(event.target.files);
    };

    //function that handles uploading one file
    const uploadFile = (file) => {
        const formData = new FormData();
        formData.append('photo', file);
        return fetch('https://gallery-backend.ccorso.ca/add-photo/', {
            method: 'POST',
            body: formData,
        });
    };

    const handleUpload = async () => {
        for (const file of selectedFiles) {
            try {
                const response = await uploadFile(file);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                else {
                    console.log('File uploaded successfully', file.name);
                }
            } 
            catch (error) {
                console.error('Error uploading file', file.name, error);
            }
        }
    };

    return (
        <Box>
            <Input
            type="file"
            inputProps={{multiple: true}}
            onChange={handleFileSelect}
            />
            <Button variant="contained" onClick={handleUpload}>Upload</Button>
        </Box>
    );
};

export default UploadPictures;