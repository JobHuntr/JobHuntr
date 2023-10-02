import React, { useState } from "react";
import { Outlet } from 'react-router-dom';


const JobContainer = () => {
  return (
    <div>
      <div>
        <h2>Current Job Applications</h2>
      </div>

      <Outlet />
    </div>
  )

}

export default JobContainer;