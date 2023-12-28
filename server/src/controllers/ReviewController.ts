import { NextFunction, Request, Response } from "express";
import Review from '../models/Review'
import { assertIsDefined } from '../utils/assertIsDefined';
import User from "../models/User";

export async function getReviews(req:Request, res:Response){
    const reviews = await Review.find()
    res.json(reviews)
}

export async function writeReview(req:Request, res:Response, next: NextFunction){

    const authenticatedUserId = req.session.userId
    
    try{
        assertIsDefined(authenticatedUserId)
        const user = await User.findById(authenticatedUserId)
        const newReview = new Review({
            user: user?.username,
            title: req.body.title,
            description: req.body.description,
            uid: user?.uid,
        })

        const createdReview = await newReview.save()
        res.json(createdReview) 
           
    }
    catch(error){
        next(error)
    }

    
}