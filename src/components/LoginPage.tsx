import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../node_modules/bootstrap/scss/bootstrap";

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
      console.log("response in Login Page", response)
      // expect a boolean value
      if (response.data) {
        navigate('/Home');
      }
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
      if (response.data) {
        setSignup(false);
      }
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
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark-subtle p-3" style={{ fontSize: '24px'}}>
      {!signup && (
      <div style={{ transform: 'scale(1.3)' }} className="mb-3" id='login' >
        <h2 className ="text-success" style={{ textAlign: 'center', fontSize: '36px' }}> Login </h2>
        <form onSubmit={(e) => clickLogin(e)} className="d-flex flex-column justify-content-center align-items-center" >
          <input className = "form-control w-100 mb-2 ps-4" type="text" placeholder="Username" onChange= {(e) => setUsername(e.target.value)}></input>
          <input className = "form-control w-100 mb-2 ps-4" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
          <button className="btn btn-primary mb-2">Submit</button>
        </form>
        <div className="d-flex flex-column align-items-center">
          <button className="btn btn-secondary mb-2" onClick={() => setSignup(true)}>Create New Account</button>
        </div>
      </div>
      )}
      {signup && (
      <div style={{ transform: 'scale(1.3)' }} className="mb-3" id='signup'>
        <h2 className ="text-success" style={{ textAlign: 'center', fontSize: '36px' }}> Signup </h2>
        <form onSubmit={(e) => {clickSignup(e)}}>
          <input className = "form-control w-100 mb-2 ps-4" type="text" placeholder="Username" value={username} onChange= {(e) => setUsername(e.target.value)}></input>
          <input className = "form-control w-100 mb-2 ps-4" type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
      )}
   </div>
  )
}


export default LoginPage;

