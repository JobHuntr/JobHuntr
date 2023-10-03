import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import JobCard from './JobCard';

// strech: date or how long since application
export type Job = {
  company: string;
  position: string;
  salary: number;
  location: string;
  description: string;
}

const JobContainer = () => {
  const [jobList, setJobList] = useState([]);

  const getList = async () => {
    // const jobListData: responseData = await axios.get('', {
    //   withCredentials: true,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // })
    const jobListData = [{company: 'abc', position: 'swe', salary: 10000, location: 'NY', description: 'something'}, 
    {company: 'abcasda', position: 'swe', salary: 20000, location: 'NY', description: 'somethingdasda'}]
    setJobList(jobListData);
  }

  useEffect(() => {getList()}, [])

  const listOfCards: JSX.Element[] = [];

  for (let i=0; i<jobList.length; i++) {
    const jobInfo = jobList[i] as Job
    listOfCards.push(<JobCard jobInfo = {jobInfo}/>)
  }


  return (
    <div>
      <div>
        <h2>Current Job Applications</h2>
        <div>
          {listOfCards}
        </div>
      </div>
    </div>
  )

}

export default JobContainer;