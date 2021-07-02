import React from 'react'
import { Line } from 'react-chartjs-2'

export default function Graph(props) {
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

    data.forEach(data => {
      if (data.Type === type) {
        weights.push(data.Weight);
      }
    })

    return weights
  }

  function extractDates(): Date[] {
    let dates = []

    data.forEach(data => {
      if (data.Type === type) {
        let date = new Date(parseInt(data.Date)).toLocaleDateString();

        dates.push(date);
      }
    })

    return dates
  }

  return (
    <div>
      {checkForData() ?
        <div className="px-2 pb-4">
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
        :
        <>
          <p className="text-center text-xl font-bold mb-8">No data</p>
        </>
      }
    </div>
  )
}
