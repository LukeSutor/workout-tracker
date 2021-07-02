import React from 'react'

export default function Signin(props) {

  function handleSubmit(e): void {
    e.preventDefault()
    
    let users = ["LukeSutor", "LisaSutor"]
    let input = (document.getElementById("login-input") as HTMLInputElement).value

    if(users.includes(input)) {
      props.setUser(input)   
    } else {

    }
  }

  return (
    <div>
      <form className="flex flex-col">
        <label>Username</label>
        <input id="login-input" className="w-min border-b border-black" />
        <button  onClick={(e) => handleSubmit(e)} className="text-left">Login</button>
      </form>
    </div>
  )
}