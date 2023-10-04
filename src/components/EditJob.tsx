import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Job } from "./JobContainer"
import axios from "axios";

type EditJobProps = {
  currentJob: Job
}
type responseData = {
  success: boolean;
}

const EditJob: React.FC<EditJobProps> = ({ currentJob }) => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<string>(currentJob.company_name);
  const [position, setPosition] = useState<string>(currentJob.position);
  const [salary, setSalary] = useState<number>(currentJob.salary);
  const [location, setLocation] = useState<string>(currentJob.location);
  const [description, setDescription] = useState<string>(currentJob.description);
  const [followUp, setFollowUp] = useState<string>(currentJob.follow_up);
  const [heardBack, setHeardBack] = useState<string>('');
  //const [tableId, setTableId] = useState<string>(id);
  // a state variable to indicate if this is for editing or adding
  // const [edit, setEdit] = useState<boolean>(true);
  
  
  const updateJob = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      follow_up: followUp,
      heardBack: heardBack
    }
    try {
      const response: responseData = await axios.patch('/jobs/update', body, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      navigate('/Home');
    }
    catch(err) {
      console.log(err);
    }
  }
  
  
  return (
    <div className = "bg-dark-subtle p-3" >
      <form className = "bg-dark-subtle mt-5 mb-5 ms-5 me-5" onSubmit={(e) => updateJob(e)}>
        <div className="mb-3">
          <label style = {{ fontSize: '20px'}} htmlFor = "company_name" className="text-success form-label">Company: </label>
          <input id = "company_name" type="text" className="form-control" placeholder="Company_name" onChange={ (e) => {setCompany(e.target.value)} } value = {company}></input>    
        </div>
        <div className="mb-3">
          <label style = {{ fontSize: '20px'}} htmlFor = "position" className="text-success form-label">Position: </label>
          <input id = "position" type="text" className="form-control" placeholder="Position" onChange={ (e) => {setPosition(e.target.value)} } value = {position}></input>
        </div>
        <div className="mb-3">
          <label style = {{ fontSize: '20px'}} htmlFor = "salary" className="text-success form-label"> Salary: </label>
          <input id = "salary" type="text" className="form-control" placeholder="Salary" onChange={ (e) => {setSalary( parseInt(e.target.value) )} } value = {salary}></input>
        </div>
        <div className="mb-3">
          <label style = {{ fontSize: '20px'}} htmlFor = "location" className="text-success form-label"> Location: </label>
          <input id = "location" type="text" className="form-control" placeholder="Location" onChange={ (e) => {setLocation(e.target.value)} } value = {location}></input>
        </div>
        <div className="mb-3">
          <label style = {{ fontSize: '20px'}} htmlFor = "description" className="text-success form-label"> Description: </label>
          <input id = "description" type="text" className="form-control" placeholder="Description" onChange={ (e) => {setDescription(e.target.value)} } value = {description}></input>
        </div>
        <div className="mb-3">
          <label style = {{ fontSize: '20px'}} htmlFor="follow_up" className="text-success form-label">Follow up? (Y/N)</label>
          <select id = "follow_up" placeholder="Choose One" className="form-select" onChange={ (e) => {setFollowUp(e.target.value)} }>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="mb-3">
          <label style = {{ fontSize: '20px'}} htmlFor="heard-back" className="text-success form-label">Heard Back? (Y/N)</label>
          <select id = "heard-back" placeholder="Choose One" className="form-select" onChange={ (e) => {setHeardBack(e.target.value)} }>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <input type="submit" className="btn btn-info text-white"></input>
        </div>
      </form>
    </div>
  )  
}


export default EditJob;