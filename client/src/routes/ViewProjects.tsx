import './ViewProjects.css'
import { TProject, getProjects } from '../api/Projects'

import { useEffect, useState } from 'react'

function ViewProjects(){
    const [projects, setProjects] = useState<TProject[]>([])

    //populates var projects with db data
    useEffect(()=>{
        async function fetchProjects(){
            const newProjects = await getProjects()
            setProjects(newProjects)
        }
        fetchProjects()
    }, [])

    return (
        <>
        <ul className='projects'>
            {projects.map((project) => (
                <li key={project._id}>
                    <ul className='proj'>
                        <li><h2>{project.title}</h2></li>
                        <li><label>Date Created: {project.date}</label></li>
                        <li><p>Description:<br/>{project.description}</p></li>
                    </ul>
                </li>
            ))}
        </ul>
        </>
    )

}

export default ViewProjects