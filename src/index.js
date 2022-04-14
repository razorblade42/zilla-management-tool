import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import { render } from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { BrowserRouter } from 'react-router-dom';
import { AllProjectsContextProvider } from './store/AllProjectcontext';
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '50px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
ReactDOM.render(
  <AllProjectsContextProvider>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>

    </BrowserRouter>
  </AllProjectsContextProvider>,
  document.getElementById('root')
);

