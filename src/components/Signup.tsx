import React, { useEffect } from 'react';

interface Profile {
  Email: string;
  Username: string;
  Password: string;
  Types: string;
}

export default function Signup(props) {

  // Check localStorage to see if the person's profile is saved there
  useEffect(() => {
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

    let email = (document.getElementById("email-input") as HTMLInputElement).value
    let username = (document.getElementById("username-input") as HTMLInputElement).value
    let password = (document.getElementById("password-input") as HTMLInputElement).value
    let types = (document.getElementById("types-input") as HTMLInputElement).value

    if (email === "" || username === "" || password === "" || types === "") {
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
      Types: "Bodyweight," + types
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

    props.setProfile(profile)
    props.history.push('/dashboard')
  }


  return (
    <div className="bg-background h-screen">
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-11/12 px-6 h-min bg-white rounded-lg -2 shadow-lg">
        <h1 className="text-3xl text-center font-bold py-8">Welcome</h1>
        <label className="text-sm">Email</label>
        <input id="email-input" className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Username</label>
        <input id="username-input" className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Password</label>
        <input id="password-input" className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Workouts to track (comma separated)</label>
        <input id="types-input" className="w-full border-b border-black focus:outline-none" placeholder="ex. Bench Press, Squats, Calf Raises"/>
        <button onClick={e => handleSubmit(e)} className="w-full py-3 mt-6 mx-auto bg-orange text-xl text-white text-center font-bold rounded-lg whitespace-nowrap">Sign up</button>
        <p className="py-4 text-center">Already have an account? <button onClick={() => props.history.push('/login')}
        className="text-orange font-semibold">Log In</button></p>
      </form>
    </div>
  )
}
