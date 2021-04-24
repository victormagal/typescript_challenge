import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/tailwind.css';
import GlobalStyle from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
