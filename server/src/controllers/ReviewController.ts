import { Request, Response } from "express";
import Review from '../models/Review'

export async function getReviews(req:Request, res:Response){
    const reviews = await Review.find()
    res.json(reviews)
}

export async function createReview(req:Request, res:Response){
    const newReview = new Review({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
    })

    const createdReview = await newReview.save()
    res.json(createdReview)
}