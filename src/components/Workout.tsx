import React, { useState } from 'react'
import Graph from './Graph'
import dumbbell from './images/dumbbell.svg'
import downArrow from './images/black_downArrow.svg'

export default function Workout(props) {

  const [expanded, setExpanded] = useState(false)

  function calcMax(): number {
    if (props.type === "Bodyweight") return NaN

    let max = NaN
    props.data.forEach(datum => {
      if (datum.Type === props.type) {
        if (datum.Reps === 1) {
          max = datum.Weight
        } else {
          max = Math.floor(datum.Weight * (1 + (0.033 * datum.Reps)))
        }
      }
    })
    return max
  }

  function calcPBW(): number {
    if (props.type === "Bodyweight") return NaN

    let bodyweight = NaN
    let weight = NaN

    props.data.forEach(datum => {
      if (datum.Type === props.type) {
        weight = datum.Weight
      } else if (datum.Type === "Bodyweight") {
        bodyweight = datum.Weight
      }
    })

    return Math.floor((weight / bodyweight) * 100)
  }

  return (
    <div className="w-11/12 mx-auto bg-white my-8 shadow-lg rounded-xl overflow-hidden">
      <div onClick={() => setExpanded(!expanded)}  className="flex flex-row py-6">
        <img src={dumbbell} alt="" className="w-8 transform -rotate-45 ml-6" />
        <p className="text-2xl font-bold ml-8">{props.type}</p>
        <img src={downArrow} alt="" className={`w-5 ml-auto mr-6 ${expanded ? "transform rotate-180" : ""}`} />
      </div>
      {expanded &&
        <>
          <Graph data={props.data} type={props.type} />
          <div className="flex flex-row justify-evenly">
            {!isNaN(calcMax()) &&
              <div className="w-2/5 border border-black rounded-lg mb-6">
                <p className="text-md text-gray-500 pl-2 pt-1">1 Rep Max:</p>
                <p className="text-2xl text-center font-bold py-2">{calcMax()}</p>
              </div>}
            {!isNaN(calcPBW()) &&
              <div className="w-2/5 border border-black rounded-lg mb-6">
                <p className="text-md text-gray-500 pl-2 pt-1">% Bodyweight</p>
                <p className="text-2xl text-center font-bold py-2">{calcPBW()}%</p>
              </div>}
          </div>
        </>
      }
    </div>
  )
}
