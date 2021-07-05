import React, { useState, useEffect } from 'react'
import Header from './Header'
import Workout from './Workout'
import AddSession from './AddSession'

export default function Dashboard(props) {

  const [data, setData] = useState([])

  useEffect(() => {
    if (props.profile?.Username === "") {
      if (localStorage.length === 0) {
        props.history.push('./signup')
      } else {
        let profile = JSON.parse(localStorage.getItem('profile'))
        props.setProfile(profile[0])
      }
    }
        
    // Only fetch userdata if the profile has been gotten, this prevents unnecessary fetches to the database
    if(props.profile.Username !== "") {
      // Fetch current user's workout data
      fetch(`https://sheet.best/api/sheets/801254c2-1797-4c47-a965-cd4c215ddc16/Username/${props.profile.Username}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // eslint-disable-next-line
  }, [props.profile])

  useEffect(() => {
    document.title = `${props.profile?.Username}'s Dashboard | Workout Tracker`
  }, [props.profile])

  let types: string[] = props.profile?.Types.split(',')
  const listedTypes = types?.map((type) =>
    <Workout key={Math.random()} data={data} type={type} />
  );

  return (
    <div className="bg-background">
      <Header {...props} data={data} profile={props.profile} />
      <div className="-mt-10 pb-32">{listedTypes}</div>
      <div className="fixed z-20 bottom-0">
        <AddSession types={types} profile={props.profile} setData={setData} />
      </div>
    </div>
  )
}
