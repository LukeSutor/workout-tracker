import React, { useEffect } from 'react'
import Header from './Header'
import Workout from './Workout'
import AddWorkout from './AddWorkout'

export default function Dashboard(props) {

  useEffect(() => {
    if (props.profile?.Username === "") {
      if (localStorage.length === 0) {
        props.history.push('./signup')
      } else {
        let profile = JSON.parse(localStorage.getItem('profile'))
        props.setProfile(profile[0])
      }
    }
    // Fetch current user's workout data

    // fetch(`https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16/Person/${props.user}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    document.title = `${props.profile?.Username}'s Dashboard | Workout Tracker`
  }, [props.profile])


  let data = [
    { Date: "1620269894340", Person: "Luke Sutor", Reps: "2", Type: "Bench Press", Weight: "225" },
    { Date: "1625185346674", Person: "Luke Sutor", Reps: "-1", Type: "Bodyweight", Weight: "209" },
    { Date: "1625185446674", Person: "Luke Sutor", Reps: "8", Type: "Bench Press", Weight: "185" },
    { Date: "1625185546974", Person: "Luke Sutor", Reps: "5", Type: "Bench Press", Weight: "205" }
  ]


  let types: string[] = props.profile?.Types.split(',')
  const listedTypes = types?.map((type) =>
    <Workout key={Math.random()} data={data} type={type} />
  );

  return (
    <div>
      <Header {...props} data={data} profile={props.profile} />
      <div className="-mt-10">{listedTypes}</div>
      <div className="fixed z-20 bottom-0">
        <AddWorkout types={types} profile={props.profile} />
      </div>
    </div>
  )
}
