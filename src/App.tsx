import React from 'react';
import './App.css';
import {Auth} from './member'

class App extends React.Component {
  render(){
    return (
      <div className="App">
          <Auth />
      </div>
    );
  }
}

export default App;
