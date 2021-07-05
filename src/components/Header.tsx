import React, { useState, useEffect } from 'react'
import downArrow from './images/downArrow.svg'

interface Workout {
  Date: number;
  Username: string;
  Type: string;
  Weight: string;
  Reps: string;
}

export default function Header(props) {

  const [profileOpen, setProfileOpen] = useState(false)

  const [weightGoalOpen, setWeightGoalOpen] = useState(false)

  const [weight, setWeight] = useState(getWeight())
  const [weightGoal, setWeightGoal] = useState(getWeightGoal())

  let today = new Date()

  useEffect(() => {
    props.data.forEach(datum => {
      if (datum.Type === `${props.profile.Username} Weightloss Goal`) {
        if (weight <= weightGoal) {
          fetch(`https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16/Type/${props.profile.Username} Weightloss Goal`,
            {
              method: "DELETE",
            }
          )
            .then((res) => res.json())
            .catch((error) => {
              console.error(error);
            });
        }
      } else if (datum.Type === `${props.profile.Username} Weightgain Goal`) {
        if (weight >= weightGoal) {
          fetch(`https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16/Type/${props.profile.Username} Weightgain Goal`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .catch((error) => {
            console.error(error);
          });
        }
      }
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setWeight(getWeight())
    setWeightGoal(getWeightGoal())
    // eslint-disable-next-line
  }, [props.data])

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

  function getWeightGoal(): string {
    let weightgoal = "-1"

    props.data.forEach(datum => {
      if (datum.Type === `${props.profile.Username} Weightloss Goal` || datum.Type === `${props.profile.Username} Weightgain Goal`) {
        weightgoal = datum.Weight
      }
    })

    return weightgoal
  }

  async function handleSubmit(e) {
    e.preventDefault()

    let weightgoal = (document.getElementById("goal-input") as HTMLInputElement).value
    setWeightGoal(weightgoal)

    let workout: Workout = {
      Date: Date.now(),
      Username: props.profile.Username,
      Type: weight > weightgoal ? `${props.profile.Username} Weightloss Goal` : `${props.profile.Username} Weightgain Goal`,
      Weight: weightgoal,
      Reps: "-1"
    }

    await fetch("https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16", {
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

    // Fetch current user's workout data
    await fetch(`https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16/Username/${props.profile.Username}`)
      .then((res) => res.json())
      .then((data) => {
        props.setData(data)
      })
      .catch((error) => {
        console.error(error);
      });

    setWeightGoalOpen(false)
  }

  return (
    <div className="bg-orange px-8 py-4 rounded-b-xl text-white shadow-lg">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div onClick={() => setProfileOpen(!profileOpen)}
          className="relative text-lg focus:outline-none inline-flex">{props.profile?.Username}
          <img className={`w-6 my-auto ${profileOpen ? "pr-2 transform rotate-180" : "pl-2"}`} src={downArrow} alt="" />
          <div className={`absolute top-full flex flex-col bg-white text-black px-4 py-2 whitespace-nowrap rounded-lg ring-1 ring-black ring-opacity-5 ${profileOpen ? "" : "hidden"}`}>
            <button onClick={e => logout(e)} className="mr-auto">Log out</button>
            <button onClick={() => props.history.push('/editprofile')} className="mr-auto">Edit Profile</button>
          </div>
        </div>
      </div>
      <p className="mt-4 mb-6 text-3xl font-bold">{today.toDateString()}</p>
      <div className="flex flex-row justify-between mb-12">
        <div>
          <p className="text-lg font-thin">Weight</p>
          <p className="text-3xl font-semibold">{weight === "-1" ? "No data" : weight}
            <span className="text-base font-normal">{weight === "-1" ? "" : "lbs"}</span></p>
        </div>
        <div>
          <p className="text-lg text-right font-thin">Weight Goal</p>
          {weightGoal !== "-1" ?
            <p className="text-3xl text-right font-semibold">{weightGoal}
              <span className="text-base font-normal">{weightGoal === "-1" ? "" : "lbs"}</span></p>
            :
            <>
              <div className="relative">
                <p className="text-right font-semibold" onClick={() => setWeightGoalOpen(!weightGoalOpen)}>Add Weight Goal +</p>
                <form className={`absolute bg-white top-full flex flex-row text-black px-5 py-3 ring-1 ring-black ring-opacity-5 rounded-lg ${weightGoalOpen ? "" : "hidden"}`}>
                  <div className="flex flex-col mr-4">
                    <label className="text-sm text-left">Goal</label>
                    <input type="number" id="goal-input" className="w-14 border-b border-black focus:outline-none" />
                  </div>
                  <button onClick={e => handleSubmit(e)} className="ml-auto h-min font-semibold">Add</button>
                </form>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}
