import React from "react";
import { Outlet } from 'react-router-dom';
import { Job } from './JobContainer';

interface JobCardProps {
  id: string;
  jobInfo: Job; // Assuming Job is the type for your job data
  getClickId: (arg: React.MouseEvent<HTMLButtonElement>) => void;
}


// company position (average)salary location description
const JobCard: React.FC<JobCardProps>= ({ id, jobInfo, getClickId }) => {
  

  return (
    <div className="card mb-2 bg-light" style={{width: '18rem'}}>

      <div className="card-body">
        <h5 className="card-title text-success">{jobInfo.company}</h5>
        <p className="card-text">{jobInfo.description}</p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">Position: {jobInfo.position}</li>
        <li className="list-group-item">Average Salary: {jobInfo.salary}</li>
        <li className="list-group-item">Location: {jobInfo.location}</li>
      </ul>
      <div className = "buttonContainer">
        <button className = "btn btn-info text-white mt-2 mr-2 ml-2 mb-2" id={id} onClick={(e) => getClickId(e)}>Edit</button>
        <button className = "btn btn-danger mt-2 mr-2 ml-2 mb-2" id={id}>Delete</button>
      </div>
    </div>
  )
}

export default JobCard;