import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import WoNavBar from './components/WoNavBar';
import JobContainer from './components/JobContainer';
import NewJob from './components/NewJob'

const App: React.FC = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WoNavBar />}>
            <Route index element={<LoginPage />} />
        </Route>
        <Route path="/Home" element={<NavBar />}> 
            <Route index element={<JobContainer />} />
            <Route path="NewJob" element={<NewJob />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
