import express from "express"
import { getProjects, createProject } from "../controllers/ProjectController"
const app = express()

app.get('/projects', getProjects)
app.post('/projects/create', createProject)

export default app;