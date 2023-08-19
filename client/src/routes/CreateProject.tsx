//import { useState } from 'react'
import './CreateProject.css'
import { TProject, createProject } from '../api/Projects'
import { useState } from 'react'

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

  return (
    <>
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
            id='project-date'
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
              setDate(e.target.value)
            }}
            />

          </li>
            
          <li>

            <label htmlFor='project-description'>Description </label>
            <input
            id='project-description'
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
              setDescription(e.target.value)
            }}
            />
          </li>
          
        </ul>
        <button>Submit</button>
      </form>
    </>
  )
}

export default CreateProject