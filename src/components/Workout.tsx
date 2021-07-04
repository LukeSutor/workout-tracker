import React, { useState } from 'react'
import Graph from './Graph'
import dumbbell from './images/dumbbell.svg'
import scale from './images/scale.svg'
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
    <div className="w-11/12 mx-auto bg-white mb-8 shadow-lg rounded-xl overflow-hidden">
      <div onClick={() => setExpanded(!expanded)}  className="flex flex-row py-6">
        <img src={props.type === "Bodyweight" ? scale : dumbbell} alt="" className={`w-8 ml-6 ${props.type === "Bodyweight" ? "px-0.5" : "transform -rotate-45"}`} />
        <p className="text-2xl font-bold ml-8">{props.type}</p>
        <img src={downArrow} alt="" className={`w-5 ml-auto mr-6 ${expanded ? "transform rotate-180" : ""}`} />
      </div>
      {expanded &&
        <>
          <Graph data={props.data} type={props.type} />
          <div className="flex flex-row justify-evenly mt-4">
            {!isNaN(calcMax()) &&
              <div className="w-2/5 border border-black text-center rounded-lg mb-6">
                <p className="text-2xl font-bold pt-1">{calcMax()}</p>
                <p className="text-md text-gray-500 pl-2 pb-2">1 Rep Max</p>
              </div>}
            {!isNaN(calcPBW()) &&
              <div className="w-2/5 border border-black text-center rounded-lg mb-6">
                <p className="text-2xl  font-bold pt-1">{calcPBW()}%</p>
                <p className="text-md text-gray-500 pl-2 pb-2">% Bodyweight</p>
              </div>}
          </div>
        </>
      }
    </div>
  )
}
