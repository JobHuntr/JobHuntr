import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface responseData {
  success: boolean;
}


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signup, setSignup] = useState<boolean>(false);

  const clickLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: responseData = await axios.post('/user/login', {username: username, password: password}, {
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

  const clickSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response: responseData = await axios.post('/user/signup', {username: username, password: password}, {
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

  const goToHome = () => {
    navigate("/Home");
  }
  
  return (
    <div>
      {!signup && (
      <div id='login'>
        <h2> Login </h2>
        <form onSubmit={(e) => clickLogin(e)}>
          <input type="text" placeholder="Username" value={username} onChange= {(e) => setUsername(e.target.value)}></input>
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button>Submit</button>
        </form>
        <div>
          <button onClick={goToHome}>Go To Home</button>
        </div>
      </div>
      )}
      {signup && (
      <div id='signup'>
        <h2> Signup </h2>
        <form onSubmit={(e) => clickSignup(e)}>
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
