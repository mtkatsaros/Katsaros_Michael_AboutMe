import { NextFunction, Request, Response } from "express";
import createHttpError from 'http-errors'
import mongoose from 'mongoose';
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

export async function updateReview(req: Request, res: Response, next: NextFunction){
    const authenticatedUserId = req.session.userId

    
    try{
        const reviewId = req.params.reviewId
        const reviewUser = req.body.user
        const title = req.body.title
        const description = req.body.description
        const uid = req.body.uid
        
        assertIsDefined(authenticatedUserId)
        const user = await User.findById(authenticatedUserId)



        try{
            if(!mongoose.isValidObjectId(reviewId)){
                throw createHttpError(400, 'Invalid review id')
            }
            if(!title || !reviewUser || !description || !uid){
                throw createHttpError(400, 'Must have user, title, uid, and description')
            }

            const review = await Review.findById(reviewId)

            if(!review){
                throw createHttpError(404, 'Review not found')
            }

            if(review.uid != user?.uid){
                next(createHttpError(401, 'User not authorized'))
            }            

            review.title = title
            review.user = reviewUser
            review.description = description
            review.uid = uid

            const updatedReview = await review.save()

            res.status(200).json(updatedReview)
        }catch(error){
            next(error)
        }     
    }
    catch(error){
        next(error)
    }
}

export async function deleteReview(req: Request, res: Response, next: NextFunction){
    const authenticatedUserId = req.session.userId
    
    try{
        assertIsDefined(authenticatedUserId)
        const user = await User.findById(authenticatedUserId)

        const isAdmin = user?.admin

        const reviewId = req.params.reviewId
        const review = await Review.findById(reviewId)
        if(!(isAdmin === "true" || review?.uid === user?.uid)){
            next(createHttpError(401, 'User not authorized'))
        }

        const deleted = await Review.findByIdAndDelete(reviewId)
        res.json(deleted)     
    }
    catch(error){
        next(error)
    } 
}