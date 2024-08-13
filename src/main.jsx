import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

import store from 'redux/store';

import App from './App.jsx';

import 'css/reset.css';
import 'css/variables.css';
import 'css/index.css';
import 'css/buttons.css';
import 'css/bubble.css'; /* анимация пузырька */
import 'css/section.css'; /* анимация секции красным */
import 'css/snippets.css';
import 'css/notiflix.css';

WebApp.ready();
WebApp.expand();
const bgColor = '#13141a';
WebApp.setHeaderColor(bgColor);
WebApp.setBackgroundColor(bgColor);
WebApp.enableClosingConfirmation();
WebApp.disableVerticalSwipes();
console.log(WebApp);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
