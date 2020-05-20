import React from 'react'
import Job from './Job'




const Jobs = ({jobs, handleTablet}) => {
  return (
    <div className="jobs">
    {jobs.map(job => <Job key={job.id} job={job} handleTablet={handleTablet} /> )} 
    </div>
  )
}

export default Jobs