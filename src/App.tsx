import React from 'react';
import './App.css';
import Auth from './member/Auth'
import Header from './common/Header';
import Footer from './common/Footer';
import Sidebar from './common/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';

type AppState = {
  sessionToken: string | null
}

class App extends React.Component <{}, AppState> {
  state = {
    sessionToken: ''
  }

  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.setState({sessionToken: localStorage.getItem('token')})
    }
  }

updateToken = (newToken: string) => {
  localStorage.setItem('token', newToken);
  this.setState({sessionToken: newToken})
}

clearToken = () => {
  localStorage.clear();
  this.setState({sessionToken: ('')})
  window.location.href = "/"
}

  protectedViews = () => {
      return(
        this.state.sessionToken === localStorage.getItem('token') ?
        <div>
          <Header />
          <Router>
            <Sidebar currentToken={this.state.sessionToken} clickLogout={this.clearToken}/>
          </Router>
          <Footer />
        </div> : <Auth updateToken={this.updateToken} clickLogout={this.clearToken} />
      )
  }
  render(){
    return (
      <div className="App">
          {this.protectedViews()}
      </div>
    );
  }
}

export default App;
