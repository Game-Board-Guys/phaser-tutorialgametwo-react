import React, { Component } from 'react';
import Game from './Game/Game';
import './App.css';

class App extends Component {
  render() {
    Game();
    return (
      <div id="myCanvas">

      </div>
    );
  }
}

export default App;
