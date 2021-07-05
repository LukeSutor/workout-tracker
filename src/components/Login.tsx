import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'

export default function Login(props) {

  const [showModal, setShowModal] = useState(false)

  const spring = useSpring({
    opacity: showModal ? 1 : 0,
  })

  // Check localStorage to see if the person's profile is saved there
  useEffect(() => {
    document.title = "Log In | Workout Tracker"

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

  function handleSubmit(e): void {
    e.preventDefault()

    let username = (document.getElementById("username-input") as HTMLInputElement).value;
    let password = (document.getElementById("password-input") as HTMLInputElement).value;

    fetch(`https://sheet.best/api/sheets/f9a8b3ec-30d1-429b-861c-2e885f120f02/Username/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.Password === password) {
          console.log("successful login");

          if (localStorage.getItem('profile') === null) {
            localStorage.setItem('profile', JSON.stringify(data))
          }

          props.setProfile(data[0])

          props.history.push('/dashboard')
        } else {
          console.log("unsuccessful login");

          setShowModal(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <animated.p style={spring} className="mx-auto mt-5 w-min px-4 py-2 text-white font-semibold text-center bg-red-500 whitespace-nowrap rounded-lg">Incorrect credentials provided</animated.p>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-11/12 px-6 h-min bg-white rounded-lg -2 shadow-lg">
        <h1 className="text-3xl text-center font-bold py-8">Welcome Back</h1>
        <label className="text-sm">Username</label>
        <input id="username-input" className="w-full border-b border-black focus:outline-none" />
        <label className="text-sm pt-4">Password</label>
        <input id="password-input" className="w-full border-b border-black focus:outline-none" />
        <button onClick={(e) => handleSubmit(e)} className="w-full py-3 mt-6 mx-auto bg-orange text-xl text-white text-center font-bold rounded-lg whitespace-nowrap">Login</button>
        <p className="py-4 text-center">Don't have an account? <button onClick={() => props.history.push('/signup')}
          className="text-orange font-semibold">Sign Up</button></p>
      </div>
    </div>
  )
}
