import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Banner from './components/Banner';

import './index.css';
import SideBar from './components/SideBar';
import Home from './components/Home';
import Document from './components/Document';
import { Provider } from "react-redux";
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);