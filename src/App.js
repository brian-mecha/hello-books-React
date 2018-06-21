import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Header />
      </div>
    );
  }
}

export default App;
