import { Project } from "../models/project";
import { API_URL, fetchData } from "./fetch_api";

export async function fetchProjects(): Promise<Project[]>{
    const response = await fetchData(`${API_URL}/projects`, {method: "GET", credentials: 'include'})
    return response.json()
}

export interface ProjectInput{
    title: string,
    date: string,
    description: string,
    github: string,
}

export async function createProject(project: ProjectInput): Promise<Project>{
    const response = await fetchData(`${API_URL}/projects/edit/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project), 
        credentials: 'include'
    })
    return response.json()
}

export async function updateProject(projectId: string, project: ProjectInput): Promise<Project>{
    const response = await fetchData(`${API_URL}/projects/edit/${projectId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project), 
        credentials: 'include'
    })
    return response.json()
}

export async function deleteProject(projectId: string){
    await fetchData(`${API_URL}/projects/edit/${projectId}/delete`, {method: "DELETE", 
    credentials: 'include'})
}
