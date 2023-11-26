import React from 'react';
import ReactDOM from 'react-dom/client';

import {ComplaintsContextProvider} from "./context/ComplaintContext";

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ComplaintsContextProvider>
      <App />
    </ComplaintsContextProvider>
  </React.StrictMode>
);
