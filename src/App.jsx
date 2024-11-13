import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';      
import Cadastro from './pages/Cadastro';
import Editar from './pages/Editar';     


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/editar" element={<Editar />} />
      </Routes>
    </Router>
  );
}

export default App;
