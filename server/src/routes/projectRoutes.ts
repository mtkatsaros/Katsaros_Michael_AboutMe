import express from "express"
import { getProjects, createProject, deleteProject, updateProject } from "../controllers/ProjectController"
import editApp from './projectEditRoutes'
import { requiresAuth } from "../middleware/auth"
const app = express()

app.use('/edit', requiresAuth, editApp)
app.get('/', getProjects)

export default app;