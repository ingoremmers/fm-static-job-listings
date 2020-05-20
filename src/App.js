import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'
import Jobs from './components/Jobs'
import JobFilter from './components/JobFilter'

const loadJobs = async () => {
  const response = await Axios.get('data.json')
  return response.data
}

function App() {
  const [jobFilter, setJobFilter] = useState({
    role: '',
    level: '',
    languages: [],
    tools: [],
  })
  const [jobs, setJobs] = useState([])

  const [filteredJobs, setFilteredJobs] = useState([])

  const removeFilter = (type, name) => {
    switch (type) {
      case 'role':
        setJobFilter({ ...jobFilter, role: '' })
        break
      case 'level':
        setJobFilter({ ...jobFilter, level: '' })
        break
      case 'language':
        let languages = jobFilter.languages.filter((x) => x !== name)
        setJobFilter({ ...jobFilter, languages: languages })
        break
      case 'tool':
        let tools = jobFilter.tools.filter((x) => x !== name)
        setJobFilter({ ...jobFilter, tools: tools })
        break
      case 'clear':
        setJobFilter({ role: '', level: '', languages: [], tools: [] })
        break
      default:
    }
  }

  const handleTablet = (value) => {
    let filterToAdd
    if (value.language || value.tool) {
      filterToAdd = value.language
        ? jobFilter.languages.includes(value.language)
          ? { languages: jobFilter.languages }
          : { languages: [...jobFilter.languages, value.language] }
        : { tools: [...jobFilter.tools, value.tool] }
    } else {
      filterToAdd = value
    }
    setJobFilter({ ...jobFilter, ...filterToAdd })
  }

  useEffect(() => {
    loadJobs().then((data) => {
      setJobs(data)
      setFilteredJobs(data)
    })
  }, [])

  useEffect(() => {
    setFilteredJobs(
      jobs.filter((job) => jobFilter.role === '' || job.role === jobFilter.role)
          .filter((job) => jobFilter.level === '' || job.level === jobFilter.level)
          .filter((job) => jobFilter.languages.length === 0 || 
            jobFilter.languages.every(j => job.languages && job.languages.includes(j)))
          .filter((job) => jobFilter.tools.length === 0 || 
            jobFilter.tools.every(t => job.tools && job.tools.includes(t)))
    )
  }, [jobFilter])

  return (
    <div className="App">
      <JobFilter filter={jobFilter} removeFilter={removeFilter} />
      <Jobs jobs={filteredJobs} handleTablet={handleTablet} />
    </div>
  )
}

export default App
