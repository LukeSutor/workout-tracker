import React, { useEffect } from 'react'
import Graph from './Graph'

// interface Exercise {
//   Date: number;
//   Person: string;
//   Type: string;
//   Weight: number;
//   Reps: number;
// }

export default function Dashboard(props) {


  useEffect(() => {
    fetch('./Types.json')
      .then(response => {
        return response.json();
      })
      .then(data => console.log(data));
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
      <Graph data={data} type="Bench Press" />
      <p>Hello</p>
    </div>
  )
}
