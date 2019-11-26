// Import React
import React from 'react';

// Import dependencies
import { render } from 'react-dom';

// Import styles
import './css/screen.css';

// Import components
import App from './app/components/App';

// Import stores
import store from './app/stores/';

// Main app component
const app = (
  <App store={store} />
);

// Root DOM element
const rootEl = document.querySelector('#app');

render(app, rootEl);
