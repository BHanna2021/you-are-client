import React from 'react';
import './App.css';
import Auth from './member/Auth'
import Header from './common/Header';
import Footer from './common/Footer';
import Sidebar from './common/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

type AppState = {
  sessionToken: string | null,
  isAdmin: string | null
  apiErr: string
}

class App extends React.Component <{}, AppState> {
  state = {
    sessionToken: '',
    isAdmin: '',
    apiErr: ', our apologies. Please try again later. If this is persistent, please submit an issue on Github.'
  }

  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.setState({sessionToken: localStorage.getItem('token')})
    }
    if (localStorage.getItem('admin')) {
      this.setState({isAdmin: localStorage.getItem('admin')})
    }
  }

updateToken = (newToken: string) => {
  localStorage.setItem('token', newToken);
  this.setState({sessionToken: newToken})
}

updateAdmin = (newAdmin: string) => {
  localStorage.setItem('admin', newAdmin);
  this.setState({isAdmin: newAdmin})
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
            <Sidebar apiErr={this.state.apiErr} currentToken={this.state.sessionToken} clickLogout={this.clearToken} isAdmin={this.state.isAdmin} />
          </Router>
          <Footer />
        </div> : <Auth updateToken={this.updateToken} clickLogout={this.clearToken} updateAdmin={this.updateAdmin} />
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
