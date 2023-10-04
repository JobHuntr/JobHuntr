import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import JobCard from './JobCard';
import EditJob from './EditJob';

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
  const [edit, setEdit] = useState<boolean>(false);
  const [currentJob, setCurrentJob] = useState<Job>();

  const getList = async () => {
    // const jobListData: responseData = await axios.get('', {
    //   withCredentials: true,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // })
    const jobListData = [{company: 'abc', position: 'swe', salary: 10000, location: 'NY', description: 'something'}, 
    {company: 'abcasda', position: 'swe', salary: 20000, location: 'NY', description: 'somethingdasda'},
    {company: 'abcasda', position: 'swe', salary: 20000, location: 'NY', description: 'somethingdasda'},
    {company: 'abcasda', position: 'swe', salary: 20000, location: 'NY', description: 'somethingdasda'},
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
    listOfCards.push(
      <div className="col-4">
        <JobCard id = {`${i}`} jobInfo = {jobInfo} getClickId={getClickId}/>
      </div>)
    }


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
      {edit && (
      <div className = "bg-dark-subtle p-3">
      <h2 style={{ textAlign: 'center', fontSize: '36px' }} className = "text-secondary">Edit Job Application:</h2>
      <div className = "bg-dark-subtle">
        <EditJob currentJob = {currentJob}/>
      </div>
    </div>
      )}
    </div>
  )

}

export default JobContainer;