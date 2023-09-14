import { Project } from "../models/project";
import { API_URL, fetchData } from "./fetch_api";

export async function fetchProjects(): Promise<Project[]>{
    const response = await fetchData(`${API_URL}/projects`, {method: "GET"})
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
        body: JSON.stringify(project)
    })
    return response.json()
}

