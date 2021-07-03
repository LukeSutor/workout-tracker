import React, { useState, useEffect } from 'react'
import downArrow from './images/downArrow.svg'
import Workout from './Workout'

export default function Dashboard(props) {

  const [profileOpen, setProfileOpen] = useState(false)

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
  

  useEffect(() => {
    if (props.profile?.Username === "") {
      if (localStorage.length === 0) {
        props.history.push('./signup')
      } else {
        let profile = JSON.parse(localStorage.getItem('profile'))
        props.setProfile(profile[0])
      }
    }
    // Fetch current user's workout data

    // fetch(`https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16/Person/${props.user}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });


    // let e: Exercise = {
    //   Date: Date.now(),
    //   Person: props.user,
    //   Type: "Weight",
    //   Weight: 158,
    //   Reps: -1
    // }


    // fetch("https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(e),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // The response comes here
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     // Errors are reported here
    //     console.log(error);
    //   });
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    document.title = `${props.profile?.Username}'s Dashboard | Workout Tracker`
  }, [props.profile])
  
  
  let data = [
    { Date: "1620269894340", Person: "Luke Sutor", Reps: "2", Type: "Bench Press", Weight: "225" },
    { Date: "1625185346674", Person: "Luke Sutor", Reps: "-1", Type: "Bodyweight", Weight: "209" },
    { Date: "1625185446674", Person: "Luke Sutor", Reps: "8", Type: "Bench Press", Weight: "185" },
    { Date: "1625185546974", Person: "Luke Sutor", Reps: "5", Type: "Bench Press", Weight: "205" }
  ]


  let types = props.profile?.Types.split(',')
  const listedTypes = types?.map((type) =>
      <Workout data={data} type={type} />
  );

  return (
    <div>
      <div className="flex flex-row justify-between bg-orange px-8 py-4 rounded-b-xl text-white shadow-lg">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div onClick={() => setProfileOpen(!profileOpen)}
          className="relative text-lg hover:text-gray-200 focus:outline-none inline-flex">{props.profile?.Username}
          <img className={`w-6 my-auto ${profileOpen ? "pr-2 transform rotate-180" : "pl-2"}`} src={downArrow} alt="" />
          <div className={`absolute top-full flex flex-col bg-gray-50 text-black px-4 py-2 whitespace-nowrap rounded-lg ring-1 ring-black ring-opacity-5 ${profileOpen ? "" : "hidden"}`}>
            <button onClick={e => logout(e)} className="mr-auto">Log out</button>
            <button onClick={() => props.history.push('/editprofile')} className="mr-auto">Edit Profile</button>
          </div>
        </div>
      </div>
      <div>{listedTypes}</div>
    </div>
  )
}
