import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootDiv = document.getElementById('root');
const rootDom = ReactDOM.createRoot(rootDiv);
rootDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
