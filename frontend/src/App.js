// src/App.js
// essa pagina exibe a pagina principal do site.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Outras rotas podem ser adicionadas aqui */}
      </Routes>
    </Router>
  );
}

export default App;
