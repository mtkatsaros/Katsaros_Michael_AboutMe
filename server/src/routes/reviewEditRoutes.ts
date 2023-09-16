import express from "express";
import { createReview } from "../controllers/ReviewController";
const app = express()

app.post('/write', createReview)


export default app