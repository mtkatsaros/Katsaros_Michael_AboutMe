import express from "express"
import { getProjects, createProject, deleteProject } from "../controllers/ProjectController"
const app = express()

app.get('/projects', getProjects)
app.post('/projects/edit', createProject)
app.delete('/projects/edit/:projectId', deleteProject)

export default app;