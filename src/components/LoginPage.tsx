import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type responseData = {
  data: boolean;
}


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signup, setSignup] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const checkLogInStatus = async() => {
    try{
    const response: responseData = await axios.get('/user/isLoggedIn', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    console.log('response: ', response);
    //setIsLoggedIn(response.data);
    return;
  }catch(err){
    console.log('Error getting Login Status');
  }
  }


  // maybe add in functionality here to give you an error if you don't include a username/password 
  // also another error if your username and password don't match (pop up message)
  const clickLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("in try clause")
      const response: responseData = await axios.post('/user/login', {username: username, password: password}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log("response", response)
      // expect a boolean value
    }
    catch (error){
      console.log(error)
    }
  }

  const clickSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const response: responseData = await axios.post('/user/signup', {username: username, password: password}, {
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // })
      if (true) setSignup(false);
    }
    catch (error){
      console.log(error)
    }
  }

  // const signupPage = () => {
  //   setSignup(true);
  //   //navigate("/");
  // }
  
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
          <button onClick={() => setSignup(true)}>Create New Account</button>
        </div>
      </div>
      )}
      {signup && (
      <div id='signup'>
        <h2> Signup </h2>
        <form onSubmit={(e) => {clickSignup(e)}}>
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

