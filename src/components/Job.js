import React from 'react'


const Job = ({job, handleTablet}) => {


 
  return (
    <div className="box job">
      <img src={job.logo} alt={job.company}/>
      <div>
      <span className="company">{job.company} </span>
      {job.new && <span class="pin new">NEW!</span>}
      {job.featured && <span class="pin feature">FEATURED</span>}
    <h2>{job.position}</h2>
    <p>{job.postedAt} <span>&bull;</span> {job.contract} <span>&bull;</span> {job.location}</p>
    </div>
    <div className="tablet-container">
      <span className="tablet" onClick={() => handleTablet({role: job.role})}>{job.role}</span>
      <span className="tablet" onClick={() => handleTablet({level: job.level})}>{job.level}</span>
      {job.languages && job.languages.map( language => 
        
      <span className="tablet" onClick={() => handleTablet({language: language})}>{language}</span>
      )}
    </div>
    </div>
  )
}

export default Job