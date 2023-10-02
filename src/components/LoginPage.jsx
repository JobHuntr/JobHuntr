import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);

  const clickLogin = async () => {
    try {
      const response = await axios.post('/user/login', {username: username, password: password}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      // expect a boolean value
    }
    catch (error){
      console.log(error)
    }
  }

  const clickSignup = async () => {
    try {
      const response = await axios.post('/user/signup', {username: username, password: password}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      // expect a boolean value
    }
    catch (error){
      console.log(error)
    }
  }
  
  return (
    <div>
      {!signup && (
      <div id='login'>
        <h2> Login </h2>
        <form onSubmit={clickLogin()}>
          <input type="text" placeholder="Username" value={username} onChange= {(e) => setUsername(e.target.value)}></input>
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button>Submit</button>
        </form>
      </div>
      )}
      {signup && (
      <div id='signup'>
        <h2> Signup </h2>
        <form onSubmit={clickSignup()}>
          <input type="text" placeholder="Username" value={username} onChange= {(e) => setUsername(e.target.value)}></input>
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button>Submit</button>
        </form>
      </div>
      )}
   </div>
  )
}


export default LoginPage;

