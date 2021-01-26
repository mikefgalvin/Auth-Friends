import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { axiosWithAuth } from './utils/axiosWithAuth';
import PrivateRoute from './utils/PrivateRoute';

import Login from './components/Login';
import Friends from './components/Friends';
import Home from './components/Home';


function App() {

  const logout = () => {
    axiosWithAuth().post('/logout')
      .then(res => {
        localStorage.removeItem('token');
        window.location.href = '/';
      })
      .catch(err => {
        console.log('error: ', err.data)
      })
  }


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to='./login' 
              style={{ textDecoration: 'none', color: 'white', padding: '2%' }}>
              Login</Link>
            <Link onClick={logout} 
              style={{ textDecoration: 'none', color: 'white', padding: '2%' }}>
              Logout</Link>
            <Link to='friends' 
              style={{ textDecoration: 'none', color: 'white', padding: '2%' }}>
              Friends</Link>
          </nav>
        </header>
        <Switch>
            <PrivateRoute exact path="/friends"  component={Friends}/>
            <Route path="/login" component={Login}/>
            <Route component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
