import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Display from './components/Display';

class App extends Component {
  render() {

  //test self invoking function  
  // let a = 5;

  // (function() {
  //   alert(a)
  // })()
  //--------------------------


    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          <Display />
        </header>
      </div>
    );
  }
}

export default App;
