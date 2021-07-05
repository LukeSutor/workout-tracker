import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import downArrow from './images/downArrow.svg'

interface Profile {
  Username: string;
  Password: string;
  Types: string;
}

export default function EditProfile(props) {

  const [username, setUsername] = useState(props.profile.Username)
  const [password, setPassword] = useState(props.profile.Password)
  const [types, setTypes] = useState(props.profile.Types)


  const [showModal, setShowModal] = useState(false)

  const spring = useSpring({
    opacity: showModal ? 1 : 0,
  })

  function onChange(e) {
    switch (e.target.id) {
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
      Username: username,
      Password: password,
      Types: types
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
          // If there are no users found, the username is not taken and the account is updated       
          fetch(`https://sheet.best/api/sheets/f9a8b3ec-30d1-429b-861c-2e885f120f02/Username/${props.profile.Username}`, {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          })
            .then((r) => r.json())
            .then((data) => {
              props.setProfile(data[0])

              localStorage.clear()
            })
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
      <div className="bg-orange px-8 pt-4 pb-5 rounded-b-xl text-white shadow-lg">
        <button onClick={() => props.history.goBack()} className="flex flex-row">
          <img src={downArrow} alt="" className="w-4 mr-1 my-auto transform rotate-90" />
          <p className="text-lg font-semibold">Back</p>
        </button>
      </div>
      <animated.p style={spring} className="mx-auto mt-5 w-min px-4 py-2 text-white font-semibold text-center bg-red-500 whitespace-nowrap rounded-lg">Username taken, please try again</animated.p>
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-11/12 px-6 h-min bg-white rounded-lg -2 shadow-lg">
        <h1 className="text-3xl text-center font-bold py-8">Edit Profile</h1>
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
