import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import Success from './pages/Success';
import Supprimer from './pages/Supprimer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/success' element={<Success />} />
        <Route path='/supprimer' element={<Supprimer />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
