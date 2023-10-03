import React from "react";
import { Outlet } from 'react-router-dom';
import { Job } from './JobContainer';

interface JobCardProps {
  jobInfo: Job; // Assuming Job is the type for your job data
}


// company position (average)salary location description
const JobCard: React.FC<JobCardProps>= ({ jobInfo }) => {
  

  return (
    <div className="jobCard">
      <label htmlFor = "company">Company: </label>
      <span id = "company">{jobInfo.company}</span>
      <p>
        <label htmlFor = "position">Position: </label>
        <span id = "position">{jobInfo.position}</span>
      </p>
      <p>
        <label htmlFor = "salary">Average Salary: </label>
        <span id = "salary">{jobInfo.salary}</span>
      </p>
      <p>
        <label htmlFor = "location">Location: </label>
        <span id = "location">{jobInfo.location}</span>
      </p>
      <p>
        <label htmlFor = "description">Description: </label>
        <span id = "description">{jobInfo.description}</span>
      </p>
      <div className = "buttonContainer">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default JobCard;