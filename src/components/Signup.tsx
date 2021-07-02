import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';

interface Profile {
  Email: string;
  Username: string;
  Password: string;
  Types: string;
}

export default function Signup(props) {

  // Check localStorage to see if the person's profile is saved there
  useEffect(() => {
    if(localStorage.length == 0) {
      return
    } else {
      let profile = JSON.parse(localStorage.getItem('profile'))
      props.setProfile(profile)
      props.history.push('/dashboard')

      console.log("Account found, automatically logging in");
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    let email = (document.getElementById("email-input") as HTMLInputElement).value
    let username = (document.getElementById("username-input") as HTMLInputElement).value
    let password = (document.getElementById("password-input") as HTMLInputElement).value
    let types = (document.getElementById("types-input") as HTMLInputElement).value

    if(email === "" || username === "" || password === "" || types === "") {
      (document.getElementById("email-input") as HTMLInputElement).placeholder = "Required Field";
      (document.getElementById("username-input") as HTMLInputElement).placeholder = "Required Field";
      (document.getElementById("password-input") as HTMLInputElement).placeholder = "Required Field";
      (document.getElementById("types-input") as HTMLInputElement).placeholder = "Required Field";
      return
    }

    let profile: Profile = {
      Email: email,
      Username: username,
      Password: password,
      Types: types + ",Weight"
    }

    fetch("https://sheet.best/api/sheets/f9a8b3ec-30d1-429b-861c-2e885f120f02", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        // The response comes here
        console.log(data);
      })
      .catch((error) => {
        // Errors are reported here
        console.log(error);
      });

      <Redirect to='/dashboard' />
  }

  console.log(props);
  
  return (
    <div>
      <form className="flex flex-col">
        <label>Email</label>
        <input id="email-input" className="w-min border-b border-black focus:outline-none" />
        <label>Username</label>
        <input id="username-input" className="w-min border-b border-black focus:outline-none" />
        <label>Password</label>
        <input id="password-input" className="w-min border-b border-black focus:outline-none" />
        <label>Workouts to track (enter comma spaced workouts. ex. Bench Press, Squats, Calf Raises)</label>
        <input id="types-input" className="w-min border-b border-black focus:outline-none" />
        <button onClick={e => handleSubmit(e)} className="text-left">Sign up</button>
        <p>Already have an account? <button onClick={() => props.history.push('/login')}>Login</button></p>
      </form>
    </div>
  )
}
