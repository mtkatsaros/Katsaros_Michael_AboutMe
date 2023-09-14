import express from "express"
import { getProjects, createProject, deleteProject, updateProject } from "../controllers/ProjectController"
import { requiresAuth } from "../middleware/auth"
const app = express()

app.get('/projects', getProjects)
app.post('/projects/edit/create', createProject)
app.delete('/projects/edit/:projectId/delete', deleteProject)
app.patch('/projects/edit/:projectId', updateProject)

export default app;