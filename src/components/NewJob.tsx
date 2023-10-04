import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

type responseData = {
  success: boolean;
}
// I added the types in for each state below
const NewJob = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [salary, setSalary] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [followUp, setFollowUp] = useState<string>('');
  const [heardBack, setHeardBack] = useState<string>('');
  // a state variable to indicate if this is for editing or adding
  // const [edit, setEdit] = useState<boolean>(true);

  const submitJob = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let follow_up: boolean = true
    if (followUp === 'false') {
      follow_up = false;
    }

    const body = {
      company_name: company,
      position: position,
      salary: salary,
      location: location,
      description: description,
      follow_up: follow_up,
      heardBack: heardBack
    }
    console.log('body: ', body)
    try {
      const response: any = await axios.post('/jobs/add', body, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      navigate('/Home') 
 
       
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className = "bg-dark-subtle p-3">
        <h2 style={{ textAlign: 'center', fontSize: '36px' }} className = "text-secondary">New Job Application:</h2>
        <form className = "bg-dark-subtle mt-5 mb-5 ms-5 me-5" onSubmit={(e) => submitJob(e)}>
          <div className="mb-3">
            <label style = {{ fontSize: '20px'}} htmlFor = "company" className="text-success form-label">Company: </label>
            <input id = "company" type="text" className="form-control" placeholder="Company" onChange={ (e) => {setCompany(e.target.value)} }></input>
          </div>
          <div className="mb-3">
            <label style = {{ fontSize: '20px'}} htmlFor = "position" className="text-success form-label">Position: </label>
            <input id = "position" type="text" className="form-control" placeholder="Position" onChange={ (e) => {setPosition(e.target.value)} }></input>
          </div>
          <div className="mb-3">
            <label style = {{ fontSize: '20px'}} htmlFor = "salary" className="text-success form-label"> Salary: </label>
            <input id = "salary" type="text" className="form-control" placeholder="Salary" onChange={ (e) => {setSalary( parseInt(e.target.value) )} }></input>
          </div>
          <div className="mb-3">
            <label style = {{ fontSize: '20px'}} htmlFor = "location" className="text-success form-label"> Location: </label>
            <input id = "location" type="text" className="form-control" placeholder="Location" onChange={ (e) => {setLocation(e.target.value)} }></input>
          </div>
          <div className="mb-3">
            <label style = {{ fontSize: '20px'}} htmlFor = "description" className="text-success form-label"> Description: </label>
            <input id = "description" type="text" className="form-control" placeholder="Description" onChange={ (e) => {setDescription(e.target.value)} }></input>
          </div>
          <div className="mb-3">
            <label style = {{ fontSize: '20px'}} htmlFor="followup" className="text-success form-label">Follow up? (Y/N)</label>
            <select id = "followup" placeholder="Choose One" className="form-select" onChange={ (e) => {setFollowUp(e.target.value)} }>
              <option value="" disabled selected hidden>Select One</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label style = {{ fontSize: '20px'}} htmlFor="heard-back" className="text-success form-label">Heard Back? (Y/N)</label>
            <select id = "heard-back" placeholder="Choose One" className="form-select" onChange={ (e) => {setHeardBack(e.target.value)} }>
              <option value="" disabled selected hidden>Select One</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <input type="submit"></input>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewJob;