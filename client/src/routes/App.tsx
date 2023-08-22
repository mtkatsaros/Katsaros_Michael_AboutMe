//import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <ul>
        <li><Link to={`projects`}>View all Projects</Link></li>
        <li><Link to={`projects/edit`}>Edit Project</Link></li>
        <li><Link to={`reviews/write`}>Write Review</Link></li>
      </ul>
      
    </>
  )
}

export default App
