import React, { useState } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';

export default function App() {

  const [profile, setProfile] = useState({
    Email: "",
    Username: "",
    Password: "",
    Types: ""
  });

  return (
    <div className="bg-background">
      <HashRouter basename='/'>
        <Route exact path='/'>
          <Redirect to='/signup' />
        </Route>
        <Route path='/signup' render={props => <Signup {...props} setProfile={setProfile} />} />
        <Route path='/login' render={props => <Login {...props} setProfile={setProfile} />} />
        <Route path='/dashboard' render={props => <Dashboard {...props} setProfile={setProfile} profile={profile} />} />
        <Route path='/editprofile' render={props => <EditProfile {...props} setProfile={setProfile} profile={profile} />} />
      </HashRouter>
    </div>
  );
}