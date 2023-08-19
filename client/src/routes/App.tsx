//import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <ul>
        <li><Link to={`projects`}>View all Projects</Link></li>
        <li><Link to={`projects/create`}>Create Project</Link></li>
      </ul>
      
    </>
  )
}

export default App
