import React, { useState } from 'react'
import plus from './images/plus.svg'
import downArrow from './images/downArrow.svg'

interface Workout {
  Date: number;
  Username: string;
  Type: string;
  Weight: string;
  Reps: string;
}

export default function AddWorkout(props) {

  const [expanded, setExpanded] = useState(false)

  const [selection, setSelection] = useState("")
  const [selectorOpen, setSelectorOpen] = useState(false)

  const listedTypes = props.types?.map((type) =>
    <p onClick={() => setSelection(type)} key={type} className="my-0.5">{type}</p>
  );

  async function handleSubmit(e) {
    e.preventDefault()

    let weight = (document.getElementById("weight-input") as HTMLInputElement).value
    let reps = (document.getElementById("reps-input") as HTMLInputElement)?.value

    if (selection === "Bodyweight") {
      reps = "-1"
      if (weight === "") {
        (document.getElementById("weight-input") as HTMLInputElement).placeholder = "Required field";
        return
      }
    } else if (weight === "" || reps === "") {
      (document.getElementById("weight-input") as HTMLInputElement).placeholder = "Required field";
      (document.getElementById("reps-input") as HTMLInputElement).placeholder = "Required field";
      return
    }

    let workout: Workout = {
      Date: Date.now(),
      Username: props.profile.Username,
      Type: selection,
      Weight: weight,
      Reps: reps
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

    setExpanded(false)
  }

  return (
    <div className={`w-screen mx-auto text-white bg-blue shadow-lg rounded-t-xl ${expanded && "pb-8"}`}>
      <div onClick={() => setExpanded(!expanded)} className="flex flex-row py-6">
        <img src={plus} alt="" className="w-8 px-1 transform ml-6" />
        <p className="text-2xl font-bold ml-8">Add Session</p>
        <img src={downArrow} alt="" className={`w-5 ml-auto mr-6 ${expanded ? "" : "transform rotate-180"}`} />
      </div>
      {expanded &&
        <div className="px-6">
          <div className="md:flex flex-row justify-evenly">
            <div className="relative md:w-1/4 bg-blue-light text-sm md:text-xl font-bold pl-4 py-2 mb-6 mt-2 rounded-lg" onClick={() => setSelectorOpen(!selectorOpen)}>
              {selection !== "" ? `${selection}` : "Select Type"}
              <div className={`absolute z-10 top-full max-h-32 md:max-h-24 overflow-y-scroll flex flex-col bg-blue-light text-white px-4 py-2 whitespace-nowrap rounded-lg ring-1 ring-black ring-opacity-5 ${selectorOpen ? "" : "hidden"}`}>{listedTypes}</div>
            </div>
            <form className={`flex flex-row pb-4 md:w-1/4 ${selection === "Bodyweight" ? "" : "justify-between"}`}>
              <div className="w-5/12">
                <label className="text-sm">Weight</label>
                <input type="number" id="weight-input" className="w-full border-b-2 border-white focus:outline-none bg-blue" />
              </div>
              {selection !== "Bodyweight" &&
                <div className="w-5/12">
                  <label className="text-sm">Reps</label>
                  <input type="number" id="reps-input" className="w-full border-b-2 border-white focus:outline-none bg-blue" />
                </div>
              }
            </form>
          </div>
          <button onClick={e => handleSubmit(e)} className="w-full mt-6 bg-orange text-xl text-white font-bold pl-4 py-2 rounded-lg focus:outline-none">Add</button>
        </div>
      }
    </div>
  )
}
