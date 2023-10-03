import React, {useState} from "react";
import { Job } from "./JobContainer"
import axios from "axios";

type EditJobProps = {
  currentJob: Job
}
type responseData = {
  success: boolean;
}

const EditJob: React.FC<EditJobProps> = ({ currentJob }) => {
  const [company, setCompany] = useState<string>(currentJob.company);
  const [position, setPosition] = useState<string>(currentJob.position);
  const [salary, setSalary] = useState<number>(currentJob.salary);
  const [location, setLocation] = useState<string>(currentJob.location);
  const [description, setDescription] = useState<string>(currentJob.description);
  const [followUp, setFollowUp] = useState<string>(currentJob.followUp);
  // a state variable to indicate if this is for editing or adding
  const [edit, setEdit] = useState<boolean>(true);
  
  
  const updateJob = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault
    const body = {
      company: company,
      position: position,
      salary: salary,
      location: location,
      description: description,
      // need to convert this to boolean in backend
      followUp: followUp
    }
    try {
      const response: responseData = await axios.patch('', body, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
    catch(err) {
      console.log(err);
    }
  }
  
  
  return (
    <div>
      <h2>Edit Job Application:</h2>
      <form onSubmit={(e) => updateJob(e)}>
        <div>
          <label htmlFor = "company">Company: </label>
          <input id = "company" type="text" placeholder="Company" onChange={ (e) => {setCompany(e.target.value)} } value = {company}></input>
        </div>
        <div>
          <label htmlFor = "position">Position: </label>
          <input id = "position" type="text" placeholder="Position" onChange={ (e) => {setPosition(e.target.value)} } value = {position}></input>
        </div>
        <div>
          <label htmlFor = "salary"> Salary: </label>
          <input id = "salary" type="text" placeholder="Salary" onChange={ (e) => {setSalary( parseInt(e.target.value) )} } value = {salary}></input>
        </div>
        <div>
          <label htmlFor = "location"> Location: </label>
          <input id = "location" type="text" placeholder="Location" onChange={ (e) => {setLocation(e.target.value)} } value = {location}></input>
        </div>
        <div>
          <label htmlFor = "description"> Description: </label>
          <input id = "description" type="text" placeholder="Description" onChange={ (e) => {setDescription(e.target.value)} } value = {description}></input>
        </div>
        <div>
          <label htmlFor="followup">Follow up? (Y/N)</label>
          <select id = "followup" placeholder="Choose One" onChange={ (e) => {setFollowUp(e.target.value)} }>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <input type="submit"></input>
        </div>
      </form>
    </div>
  )  
}


export default EditJob;