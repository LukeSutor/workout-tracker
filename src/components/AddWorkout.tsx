import React, { useState } from 'react'
import plus from './images/plus.svg'
import downArrow from './images/black_downArrow.svg'

interface Workout {
  Date: number;
  Email: string;
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

  function handleSubmit(e) {
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
      Email: props.profile.Email,
      Type: selection,
      Weight: weight,
      Reps: reps
    }

    fetch("https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={`w-11/12 mx-auto bg-white my-8 shadow-lg rounded-xl ${expanded && "pb-6"}`}>
      <div onClick={() => setExpanded(!expanded)} className="flex flex-row py-6">
        <img src={plus} alt="" className="w-8 px-1 transform ml-6" />
        <p className="text-2xl font-bold ml-8">Add Data</p>
        <img src={downArrow} alt="" className={`w-5 ml-auto mr-6 ${expanded ? "transform rotate-180" : ""}`} />
      </div>
      {expanded &&
        <div className="px-6">
          <form className={`flex flex-row pb-4 ${selection === "Bodyweight" ? "" : "justify-between"}`}>
            <div className="w-5/12">
              <label className="text-sm">Weight</label>
              <input type="number" id="weight-input" className="w-full border-b border-black focus:outline-none" />
            </div>
            {selection !== "Bodyweight" &&
              <div className="w-5/12">
                <label className="text-sm">Reps</label>
                <input type="number" id="reps-input" className="w-full border-b border-black focus:outline-none" />
              </div>
            }
          </form>
          <div className="relative bg-gray-100 text-xl font-bold pl-4 py-2 rounded-lg" onClick={() => setSelectorOpen(!selectorOpen)}>{selection !== "" ? `${selection}` : "Select Type"}
            <div className={`absolute z-10 top-full flex flex-col bg-gray-50 text-black px-4 py-2 whitespace-nowrap rounded-lg ring-1 ring-black ring-opacity-5 ${selectorOpen ? "" : "hidden"}`}>{listedTypes}</div>
          </div>
          <button onClick={e => handleSubmit(e)} className="w-full mt-6 bg-orange text-xl text-white font-bold pl-4 py-2 rounded-lg focus:outline-none">Add</button>
        </div>
      }
    </div>
  )
}
