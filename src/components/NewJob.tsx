import React, { useState } from "react";
import { Outlet } from 'react-router-dom';

const NewJob = () => {
  return (
    <div>
      <div>
        <h2>Create New Job Applications</h2>
      </div>

      <Outlet />
    </div>
  )
}

export default NewJob;