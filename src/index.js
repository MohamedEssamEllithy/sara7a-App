import React from 'react';
import ReactDOM from 'react-dom/client';
import"../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TokenContextProvider from './components/Context/Context';
import { Provider } from 'react-redux';
import Store from './redux/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
   <TokenContextProvider>
      <App />
    </TokenContextProvider>
    </Provider>
  </React.StrictMode>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
