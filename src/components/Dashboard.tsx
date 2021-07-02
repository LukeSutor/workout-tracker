import React, { useState, useEffect, useRef } from 'react'
import downArrow from './images/downArrow.svg'
import Graph from './Graph'

// interface Exercise {
//   Date: number;
//   Person: string;
//   Type: string;
//   Weight: number;
//   Reps: number;
// }

export default function Dashboard(props) {

  const [profileOpen, setProfileOpen] = useState(false)

  const profileRef = useRef()

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

console.log(props);

  useEffect(() => {
    if(props.profile.Username === "") {
      if(localStorage.length === 0) {
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
  }, [])


  let data = [
    { Date: "1625185037699", Person: "Luke Sutor", Reps: "2", Type: "Bench Press", Weight: "225" },
    { Date: "1625185346674", Person: "Luke Sutor", Reps: "-1", Type: "Weight", Weight: "209" },
    { Date: "1625185446674", Person: "Luke Sutor", Reps: "8", Type: "Bench Press", Weight: "185" },
    { Date: "1625185546974", Person: "Luke Sutor", Reps: "5", Type: "Bench Press", Weight: "205" }
  ]  

  return (
    <div>
      <div className="flex flex-row justify-between bg-orange px-8 py-4 rounded-b-xl text-white">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button ref={profileRef} onClick={() => setProfileOpen(!profileOpen)}
          className="relative hover:text-gray-200 focus:outline-none inline-flex">{props.profile?.Username}
          <img className={`w-6 my-auto ${profileOpen ? "pr-2 transform rotate-180" : "pl-2"}`} src={downArrow} alt="" />
          <div className={`absolute top-full flex flex-col bg-gray-50 text-black text-left px-4 py-2 whitespace-nowrap rounded-lg ring-1 ring-black ring-opacity-5 ${profileOpen ? "" : "hidden"}`}>
            <button onClick={e => logout(e)}>Log out</button>
            <button>Edit Profile</button>
          </div>
        </button>
      </div>
      <Graph data={data} type="Bench Press" />
    </div>
  )
}
