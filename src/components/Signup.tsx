import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring'

interface Profile {
  Username: string;
  Password: string;
  Types: string;
}

interface Workout {
  Date: number;
  Username: string;
  Type: string;
  Weight: string;
  Reps: string;
}

export default function Signup(props) {

  const [showModal, setShowModal] = useState(false)

  const spring = useSpring({
    opacity: showModal ? 1 : 0,
  })

  // Check localStorage to see if the person's profile is saved there
  useEffect(() => {
    // document.body.appendChild(document.getElementsByTagName("form")[0]);
    document.title = "Sign Up | Workout Tracker"

    if (localStorage.length === 0) {
      return
    } else {
      let profile = JSON.parse(localStorage.getItem('profile'))
      props.setProfile(profile[0])
      props.history.push('/dashboard')

      console.log("Account found, automatically logging in");
    }
    // eslint-disable-next-line
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    let username = (document.getElementById("username-input") as HTMLInputElement).value
    let password = (document.getElementById("password-input") as HTMLInputElement).value
    let weight = (document.getElementById("weight-input") as HTMLInputElement).value
    let types = (document.getElementById("types-input") as HTMLInputElement).value    

    if (username === "" || password === "" || weight === "" || types === "") {
      (document.getElementById("username-input") as HTMLInputElement).placeholder = "Required Field";
      (document.getElementById("password-input") as HTMLInputElement).placeholder = "Required Field";
      (document.getElementById("weight-input") as HTMLInputElement).placeholder = "Required Field";
      (document.getElementById("types-input") as HTMLInputElement).placeholder = "Required Field";
      return
    }

    let profile: Profile = {
      Username: username,
      Password: password,
      Types: "Bodyweight," + types
    }

    let workout: Workout = {
      Date: Date.now(),
      Username: username,
      Type: "Bodyweight",
      Weight: weight,
      Reps: "-1"
    }

    fetch(`https://sheet.best/api/sheets/f9a8b3ec-30d1-429b-861c-2e885f120f02/Username/${username}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          // If there are no users found, the username is not taken and the account is created and the user is signed in        
          fetch("https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(workout),
          })
            .then((res) => res.json())
            .catch((error) => {
              console.error(error);
            });
      
      
          fetch("https://sheet.best/api/sheets/f9a8b3ec-30d1-429b-861c-2e885f120f02", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          })
            .then((res) => res.json())
            .catch((error) => {
              console.error(error);
            });
      
          props.setProfile(profile)
          props.history.push('/dashboard')
        } else {
          // If there is an account with that username already, the username taken modal is shown.
          setShowModal(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


  return (
    <div>
      <animated.p style={spring} className="mx-auto mt-5 w-min px-4 py-2 text-white font-semibold text-center bg-red-500 whitespace-nowrap rounded-lg">Username taken, please try again</animated.p>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-11/12 lg:w-2/3 px-6 lg:px-16 h-min bg-white rounded-lg -2 shadow-lg">
        <h1 className="text-3xl text-center font-bold py-8">Welcome</h1>
        <label className="text-sm">Username</label>
        <input id="username-input" className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Password</label>
        <input id="password-input" className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Weight</label>
        <input type="number" id="weight-input" className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Workouts to track (comma separated)</label>
        <input id="types-input" className="w-full border-b border-black focus:outline-none" placeholder="ex. Bench Press, Squats, Calf Raises" />
        <button onClick={e => handleSubmit(e)} className="w-full py-3 mt-6 mx-auto bg-orange text-xl text-white text-center font-bold rounded-lg whitespace-nowrap">Sign up</button>
        <p className="py-4 text-center">Already have an account? <button onClick={() => props.history.push('/login')}
          className="text-orange font-semibold">Log In</button></p>
      </div>
    </div>
  )
}
