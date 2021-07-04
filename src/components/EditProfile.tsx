import React, { useState, useEffect } from 'react'
import downArrow from './images/downArrow.svg'

interface Profile {
  Email: string;
  Username: string;
  Password: string;
  Types: string;
}

export default function EditProfile(props) {

  const [email, setEmail] = useState(props.profile.Email)
  const [username, setUsername] = useState(props.profile.Username)
  const [password, setPassword] = useState(props.profile.Password)
  const [types, setTypes] = useState(props.profile.Types)

  function onChange(e) {
    switch (e.target.id) {
      case "email-input":
        setEmail(e.target.value)
        break;

      case "username-input":
        setUsername(e.target.value)
        break;

      case "password-input":
        setPassword(e.target.value)
        break;

      case "types-input":
        setTypes(e.target.value)
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    document.title = `Edit Profile | Workout Tracker`

    if (props.profile?.Username === "") {
      if (localStorage.length === 0) {
        props.history.push('./signup')
      } else {
        let profile = JSON.parse(localStorage.getItem('profile'))
        props.setProfile(profile[0])
      }
    }
    // eslint-disable-next-line
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    let profile: Profile = {
      Email: email,
      Username: username,
      Password: password,
      Types: types
    }

    fetch(`https://sheet.best/api/sheets/f9a8b3ec-30d1-429b-861c-2e885f120f02/Email/${props.profile.Email}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);

        props.setProfile(data[0])

        localStorage.clear()
      })
      .catch((error) => {
        console.log(error);
      });

      props.history.push('/dashboard')
  }

  return (
    <div className="bg-background h-screen">
      <div className="bg-orange px-8 pt-4 pb-5 rounded-b-xl text-white shadow-lg">
        <button onClick={() => props.history.goBack()} className="flex flex-row">
          <img src={downArrow} alt="" className="w-4 mr-1 my-auto transform rotate-90" />
          <p className="text-lg font-semibold">Back</p>
        </button>
      </div>
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-11/12 px-6 h-min bg-white rounded-lg -2 shadow-lg">
        <h1 className="text-3xl text-center font-bold py-8">Edit Profile</h1>
        <label className="text-sm">Email</label>
        <input id="email-input" onChange={e => onChange(e)} value={email} className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Username</label>
        <input id="username-input" onChange={e => onChange(e)} value={username} className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Password</label>
        <input id="password-input" onChange={e => onChange(e)} value={password} className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Workouts to track (comma separated)</label>
        <input id="types-input" onChange={e => onChange(e)} value={types} className="w-full border-b border-black focus:outline-none" />
        <button onClick={e => handleSubmit(e)} className="w-full py-3 mb-4 mt-6 mx-auto bg-orange text-xl text-white text-center font-bold rounded-lg whitespace-nowrap">Submit</button>
      </form>
    </div>
  )
}
