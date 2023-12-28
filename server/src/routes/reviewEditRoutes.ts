import express from "express";
import { writeReview } from "../controllers/ReviewController";
const app = express()

app.post('/write', writeReview)


export default app