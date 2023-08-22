import { useState, useEffect } from 'react'
import './EditProject.css'
import { TProject, createProject, deleteProject, getProjects } from '../api/Projects'

function CreateProject() {
  const [projects, setProjects] = useState<TProject[]>([])
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  /**
   * @function handleCreateProject
   * @description handles the user submitted fields and stores 
   * the data in the database
   * @param e the fields submitted from the user
   */
  async function handleCreateProject(e: React.FormEvent){
    e.preventDefault()
    const project = await createProject(title, date, description)
    setProjects([...projects, project])
    setTitle("")
    setDate("")
    setDescription("")
  }

  async function handleDeleteProject(projectId: string){
    await deleteProject(projectId)
    setProjects(projects.filter((project) => project._id !== projectId))
  }

  useEffect(()=>{
    async function fetchProjects(){
        const newProjects = await getProjects()
        setProjects(newProjects)
    }
    fetchProjects()
}, [])

  return (
    <>
      <h1>Edit Projects</h1>
      <h2>Create a Project</h2>
      <div className='create'>
        <form onSubmit={handleCreateProject} className='fields'>
          <ul>
            <li>
              <label htmlFor='project-title'>Project Title </label>
              <input 
              id='project-title'
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value)
              }} 
              />
              
            </li>

            <li>
              <label htmlFor='project-date'>Date of completion </label>
              <input 
              type='date'
              id='project-date'
              value={date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                setDate(e.target.value)
              }}
              />
            </li>
              
            <li className='description'>
              <label htmlFor='project-description'>Description </label>
              <textarea
              id='project-description'
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>{
                setDescription(e.target.value)
              }}
              />
            </li>
            
          </ul>
          <button>Submit</button>
        </form>
      </div>
      <h2>Delete a Project</h2>
      <ul className='delete'>
        {projects.map((project) => (
          <li key={project._id}>
            <button onClick={() => handleDeleteProject(project._id)}>{project.title}</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default CreateProject