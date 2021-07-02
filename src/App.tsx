import React, { useState } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {

  const [profile, setProfile] = useState({
    Email: "",
    Username: "",
    Password: "",
    Types: ""
  });

  return (
    <HashRouter basename='/'>
      <Route exact path='/'>
        <Redirect to='/signup' />
      </Route>
      <Route path='/signup' render={props => <Signup {...props} setProfile={setProfile} />}/>
      <Route path='/login' render={props => <Login {...props} setProfile={setProfile} />} />
      <Route path='/dashboard' render={props => <Dashboard {...props} profile={profile} />} />
    </HashRouter>
  );
}