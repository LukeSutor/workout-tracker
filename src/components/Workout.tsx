import React, { useState } from 'react'
import Graph from './Graph'
import dumbbell from './images/dumbbell.svg'
import downArrow from './images/black_downArrow.svg'

export default function Workout(props) {

  const [expanded, setExpanded] = useState(false)

  return (
    <div onClick={() => setExpanded(!expanded)} className="w-11/12 mx-auto bg-white my-8 shadow-lg rounded-xl overflow-hidden">
      <div className="flex flex-row py-6">
        <img src={dumbbell} alt="" className="w-10 transform -rotate-45 ml-6" />
        <p className="text-2xl font-bold ml-8">{props.type}</p>
        <img src={downArrow} alt="" className={`w-5 ml-auto mr-6 ${expanded ? "transform rotate-180" : ""}`} />
      </div>
      {expanded &&
        <Graph data={props.data} type={props.type} />
      }
    </div>
  )
}
