import express from "express"
import { getProjects, createProject, deleteProject, updateProject } from "../controllers/ProjectController"
const app = express()

app.post('/create', createProject)
app.delete('/:projectId/delete', deleteProject)
app.patch('/:projectId', updateProject)

export default app;