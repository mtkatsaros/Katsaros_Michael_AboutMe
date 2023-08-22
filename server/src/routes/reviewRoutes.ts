import express from "express";
import { createReview, getReviews } from "../controllers/ReviewController";
const app = express()

app.get('/reviews', getReviews)
app.post('/reviews/write', createReview)


export default app