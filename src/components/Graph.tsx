import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'

export default function Graph(props) {

  const [filter, setFilter] = useState("1m")

  let data = props.data;
  let type = props.type;

  function checkForData(): boolean {
    let count = 0

    data.forEach(data => {
      if (data.Type === type) {
        count++
      }
    })

    return count !== 0
  }

  function extractWeights(): number[] {
    let weights = []
    let currentDate = Date.now()

    data.forEach(data => {
      if (data.Type === type) {
        switch (filter) {
          case "1m":
            if (currentDate - data.Date < 2629740000) weights.push(data.Weight);
            break;

          case "3m":
            if (currentDate - data.Date < 7889231500) weights.push(data.Weight);
            break;

          case "6m":
            if (currentDate - data.Date < 15778463000) weights.push(data.Weight);
            break;

          case "1y":
            if (currentDate - data.Date < 31556926000) weights.push(data.Weight);
            break;

          case "all":
            weights.push(data.Weight);
            break;

          default:
            break;
        }
      }
    })

    return weights
  }  

  function extractDates(): Date[] {
    let dates = []
    let currentDate = Date.now()

    data.forEach(data => {
      if (data.Type === type) {
        let date = new Date(parseInt(data.Date)).toLocaleDateString()
        switch (filter) {
          case "1m":
            if (currentDate - data.Date < 2629740000) dates.push(date);
            break;

          case "3m":
            if (currentDate - data.Date < 7889231500) dates.push(date);
            break;

          case "6m":
            if (currentDate - data.Date < 15778463000) dates.push(date);
            break;

          case "1y":
            if (currentDate - data.Date < 31556926000) dates.push(date);
            break;

          case "all":
            dates.push(date);
            break;

          default:
            break;
        }
      }
    })

    return dates
  }

  return (
    <div>
      {checkForData() ?
        <>
          <div className="px-4">
            <Line
              type="line"
              width={100}
              height={200}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }}
              data={{
                labels: extractDates(),
                datasets: [
                  {
                    label: type,
                    data: extractWeights(),
                    lineTension: 0,
                    fill: false,
                    borderColor: '#FF6701'
                  },
                ]
              }}
            />
          </div>
          <div className="flex flex-row justify-evenly pb-6 pt-1">
            <button onClick={() => setFilter("1m")} className={`px-3 py-1 border text-lg rounded-xl focus:outline-none 
            ${filter === "1m" ? "border-orange" : "border-black"}`}>1m</button>
            <button onClick={() => setFilter("3m")} className={`px-3 py-1 border text-lg rounded-xl focus:outline-none 
            ${filter === "3m" ? "border-orange" : "border-black"}`}>3m</button>
            <button onClick={() => setFilter("6m")} className={`px-3 py-1 border text-lg rounded-xl focus:outline-none 
            ${filter === "6m" ? "border-orange" : "border-black"}`}>6m</button>
            <button onClick={() => setFilter("1y")} className={`px-3 py-1 border text-lg rounded-xl focus:outline-none 
            ${filter === "1y" ? "border-orange" : "border-black"}`}>1y</button>
            <button onClick={() => setFilter("all")} className={`px-3 py-1 border text-lg rounded-xl focus:outline-none 
            ${filter === "all" ? "border-orange" : "border-black"}`}>all</button>
          </div>
        </>
        :
        <>
          <p className="text-center text-xl font-bold mb-8">No data</p>
        </>
      }
    </div>
  )
}
