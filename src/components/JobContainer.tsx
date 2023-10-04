import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import JobCard from './JobCard';
import EditJob from './EditJob';
import axios from "axios"
// strech: date or how long since application
export type Job = {
  id: string;
  company: string;
  position: string;
  salary: number;
  location: string;
  description: string;
  followUp: string;
  getClickId: () => void;
}

const JobContainer = () => {
  const [jobList, setJobList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job>();

  const getList = async () => {
    // const jobListData: Response = await axios.get('/jobs/list', {
    //   withCredentials: true,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // })
    // console.log(jobListData);
    const jobListData = [{company: 'abc', position: 'swe', salary: 10000, location: 'NY', description: 'something', followUp: false}, 
    {company: 'abcasda', position: 'swe', salary: 20000, location: 'NY', description: 'somethingdasda'}]
    setJobList(jobListData);
  }

  const getClickId = (e: React.MouseEvent<HTMLButtonElement>) => {
    //setEditID(e.target.id);
    setCurrentJob(jobList[parseInt(e.currentTarget.id)]);
    setEdit(true);
  }

  useEffect(() => {getList()}, [])

  const listOfCards: JSX.Element[] = [];

  for (let i=0; i<jobList.length; i++) {
    const jobInfo = jobList[i] as Job
    listOfCards.push(<JobCard id = {`${i}`} jobInfo = {jobInfo} getClickId={getClickId}/>)
  }


  return (
    <div>
      {!edit && (
      <div>
        <h2>Current Job Applications</h2>
        <div>
          {listOfCards}
        </div>
      </div>
      )}
      {edit && (
      <div>
      <h2>Edit Job Application:</h2>
      <div>
        <EditJob currentJob = {currentJob}/>
      </div>
    </div>
      )}
    </div>
  )

}

export default JobContainer;