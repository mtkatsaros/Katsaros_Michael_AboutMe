import { Project } from "../models/project";
import { API_URL, fetchData } from "./fetch_api";

export async function fetchProjects(): Promise<Project[]>{
    const response = await fetchData(`${API_URL}/projects`, {method: "GET"})
    return response.json()
}