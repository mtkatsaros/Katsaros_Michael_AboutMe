import express from "express";
import { writeReview, deleteReview, updateReview } from "../controllers/ReviewController";
const app = express()

app.post('/write', writeReview)
app.delete('/:reviewId/delete', deleteReview)
app.patch('/:reviewId', updateReview)

export default app