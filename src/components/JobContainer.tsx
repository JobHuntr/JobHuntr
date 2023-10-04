import React, { useState, useEffect } from "react";
import JobCard from './JobCard';
import EditJob from './EditJob';
import axios from "axios"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// strech: date or how long since application
export type Job = {
  id: string;
  company_name: string;
  date_applied: string;
  position: string;
  salary: number;
  location: string;
  description: string;
  follow_up: string;
  getClickId: () => void;
}

const JobContainer = () => {
  const [jobList, setJobList] = useState([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<Job>();

  const getList = async () => {
    const jobListData: any = await axios.get('/jobs/list', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log('jobListData: ', jobListData.data);
    setJobList(jobListData.data);
  }
  useEffect(() => {
    getList()
  }, [])

  const getClickId = (e: React.MouseEvent<HTMLButtonElement>) => {
    //setEditID(e.target.id);
    setEdit(true);
    setCurrentJob(jobList[parseInt(e.currentTarget.id)]);

  }



  const listOfCards: JSX.Element[] = [];

  for (let i=0; i<jobList.length; i++) {
    const jobInfo = jobList[i] as Job
    listOfCards.push(
      <div className="col-4">
        <JobCard id = {jobInfo.id} jobInfo = {jobInfo} getClickId={getClickId} edit = {edit}/>
      </div>)

  return (
    <div>
      {!edit && (
      <div className="grid text-center bg-dark-subtle p-3">
        <h2 className = "text-secondary">Current Job Applications: </h2>
        <div className= "row gy-5" >
          {listOfCards}
        </div>
      </div>
      )}
    </div>
  )
}
}

export default JobContainer;