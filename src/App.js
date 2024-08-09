import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';

import Update from './components/Update';
import Home from './components/Home';


function App() {
  return (
    <>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
     
    </>
  );
}

export default App;
