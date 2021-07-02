import React, { useState } from 'react';
import Signin from './components/Signin'

// interface Exercise {
//   Date: Date;
//   Type: string;
//   Weight: number;
//   Reps: number;
// }

export default function App() {

  const [user, setUser] = useState<String>("");

  return (
    <>
      {
        user == "" ?
            <Signin setUser={setUser} />
          :
          <>
            <p>signed in as {user}</p>
          </>
      }
    </>
  );
}