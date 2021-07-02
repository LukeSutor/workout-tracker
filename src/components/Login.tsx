import React, { useEffect } from 'react'

export default function Login(props) {

    // Check localStorage to see if the person's profile is saved there
    useEffect(() => {
      if(localStorage.length == 0) {
        return
      } else {
        let profile = JSON.parse(localStorage.getItem('profile'))
        props.setProfile(profile)
        props.history.push('/dashboard')

        console.log("Account found, automatically logging in");
      }
    }, [])
  
  function handleSubmit(e): void {
    e.preventDefault()
    
    let username = (document.getElementById("username-input") as HTMLInputElement).value;
    let password = (document.getElementById("password-input") as HTMLInputElement).value;

    fetch(`https://sheet.best/api/sheets/f9a8b3ec-30d1-429b-861c-2e885f120f02/Password/${password}`)
      .then((res) => res.json())
      .then((data) => {
        if(data[0].Username === username) {
          console.log("successful login");

          if(localStorage.getItem('profile') == null) {
            localStorage.setItem('profile', JSON.stringify(data))
          }

          props.history.push('/dashboard')
        } else {
          console.log("unsuccessful login");
          
          return
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <form className="flex flex-col">
        <label>Username</label>
        <input id="username-input" className="w-min border-b border-black focus:outline-none" />
        <label>Password</label>
        <input id="password-input" className="w-min border-b border-black focus:outline-none" />
        <button onClick={(e) => handleSubmit(e)} className="text-left">Login</button>
      </form>
    </div>
  )
}
