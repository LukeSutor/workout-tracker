import React, { useState } from 'react'
import downArrow from './images/downArrow.svg'

export default function Header(props) {

  const [profileOpen, setProfileOpen] = useState(false)

  let today = new Date()

  function logout(e) {
    e.preventDefault()

    localStorage.clear()
    props.setProfile({
      Email: "",
      Username: "",
      Password: "",
      Types: ""
    })
    props.history.push('/login')
  }

  function getWeight(): string {
    let weight = "-1"

    props.data.forEach(datum => {
      if (datum.Type === "Bodyweight") {
        weight = datum.Weight
      }
    })

    return weight
  }

  return (
    <div className="bg-orange px-8 py-4 rounded-b-xl text-white shadow-lg">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div onClick={() => setProfileOpen(!profileOpen)}
          className="relative text-lg hover:text-gray-200 focus:outline-none inline-flex">{props.profile?.Username}
          <img className={`w-6 my-auto ${profileOpen ? "pr-2 transform rotate-180" : "pl-2"}`} src={downArrow} alt="" />
          <div className={`absolute top-full flex flex-col bg-gray-50 text-black px-4 py-2 whitespace-nowrap rounded-lg ring-1 ring-black ring-opacity-5 ${profileOpen ? "" : "hidden"}`}>
            <button onClick={e => logout(e)} className="mr-auto">Log out</button>
            <button onClick={() => props.history.push('/editprofile')} className="mr-auto">Edit Profile</button>
          </div>
        </div>
      </div>
      <p className="mt-4 mb-6 text-3xl font-bold">{today.toDateString()}</p>
      <div className="flex flex-row justify-between mb-16">
        <div>
          <p className="text-lg font-thin">Weight</p>
          <p className="text-3xl font-semibold">{getWeight() === "-1" ? "No data" : getWeight()}
            <span className="text-base font-normal">lbs</span></p>
        </div>
        <div className="w-0.5 h-10 my-auto bg-gray-200" />
        <div>
          <p className="text-lg font-thin">Weight</p>
          <p className="text-3xl font-semibold">{getWeight() === "-1" ? "No data" : getWeight()}
            <span className="text-base font-normal">{getWeight() === "-1" ? "" : "lbs"}</span></p>
        </div>
      </div>
    </div>
  )
}
