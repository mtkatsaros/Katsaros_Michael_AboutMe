import { useEffect, useState } from 'react'
import { Project as ProjectModel } from '../models/project'
import Project from './Project'
import { Container, Row } from 'react-bootstrap'

function App() {
  const [projects, setProjects] = useState<ProjectModel[]>([])

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
      <Container className='Projects'>
        <h1 style={{color: 'lightblue'}}>Projects</h1>
        <Row className='g-2'>
          {projects.map(project => (
          <Project project={project} key={project._id}/>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default App
