import React from 'react'
import { Line } from 'react-chartjs-2'

export default function Graph(props) {
  let data = props.data;
  let type = props.type;

  function extractWeights(): number[] {
    let weights = []
    
    data.forEach(data => {
      if(data.Type === type) { 
        weights.push(data.Weight);
      }
    })

    return weights
  }

  function extractDates(): Date[] {
    let dates = []
    
    data.forEach(data => {
      if(data.Type === type) {
        let date = new Date(parseInt(data.Date)).toDateString();
        
        dates.push(date);
      }
    })

    return dates
  }
  
  return (
    <div>
      <Line
          type="line"
          width={100}
          height={400}
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
                borderColor: 'rgb(59, 170, 197)'
              },
            ]
          }}
        />
    </div>
  )
}
