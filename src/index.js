import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../src/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import consoleTest from '../src/consoleTest';

//Provider passes down the global store to all components inside the App component

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
