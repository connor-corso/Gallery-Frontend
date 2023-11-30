import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
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

const theme = createTheme({
  direction: 'rtl',
  // other theme properties
});

function App() {
  return (
    <ThemeProvider theme={theme}>

    <Router>
      <NavBar />
      <Routes>

        <Route path="/" element={<PhotoGallery />} />
    
        <Route path="/upload" element={<UploadPictures />} />
    
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
    
    </ThemeProvider>
  )
}

export default App;