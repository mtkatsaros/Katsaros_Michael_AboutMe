/**
 * Projects.ts
 * @author Michael Katsaros
 * The Projects file handles all of the Project data
 * on the client side
 */
import { API_URL } from "./config"

export type TProject = {
    title: string;
    date: string;
    description: string;
    _id: string;
};

export async function getProjects(): Promise<TProject[]>{
    const response = await fetch(`${API_URL}/projects`)
    return response.json()
}

export async function createProject(title:string, date:string, description:string){
    const response = await fetch(`${API_URL}/projects/edit`, {
        method: "POST",
        body: JSON.stringify({
            title,
            date,
            description,
        }),
        headers:{
            "Content-Type": "application/json"
        },
    })
    return response.json()
}

export async function deleteProject(projectId: string){
    await fetch(`${API_URL}/projects/edit/${projectId}`, {
        method: "DELETE",
    })
}
