import express from "express";
import { getReviews } from "../controllers/ReviewController";
import { requiresAuth } from "../middleware/auth";
import editApp from './reviewEditRoutes'
const app = express()

app.use('/edit', editApp)
app.get('/', getReviews)


export default app