import React from 'react';
import './App.css';
import Auth from './components/Auth'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component={Auth}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
