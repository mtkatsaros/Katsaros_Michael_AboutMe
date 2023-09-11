import { useEffect, useState } from 'react'
import './App.css'
import { Project } from '../models/project'

function App() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function loadProjects(){
      try{
        const response = (await fetch(`http://localhost:50000/projects`, {method:"GET"}))
        const project = await response.json()
        setProjects(project)
      }catch(error){
        console.error(error)
        alert(error)
      }
    }
    loadProjects()
  }, [])

  return (
    
    <>
      {JSON.stringify(projects)}
    </>
  )
}

export default App
