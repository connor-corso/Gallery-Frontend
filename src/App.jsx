import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link
} from "react-router-dom";

import PhotoGallery from './components/PhotoGallery';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from './components/NavBar';
import UploadPictures from './components/UploadForm';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>

        <Route path="/" element={<PhotoGallery />} />
    
        <Route path="/upload" element={<UploadPictures />} />
    
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
    
  )
}

export default App;