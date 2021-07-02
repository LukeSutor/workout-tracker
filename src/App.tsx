import React, { useState } from 'react';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';

export default function App() {

  const [user, setUser] = useState("");

  return (
    <>
      {
        user === "" ?
            <Signin setUser={setUser} />
          :
          <>
            <p>signed in as {user}</p>
            <Dashboard user={user} />
          </>
      }
    </>
  );
}