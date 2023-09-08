import dotenv from "dotenv";
dotenv.config()
import { Request, Response, NextFunction } from "express";
import createHttpError from 'http-errors'
import User from "../models/User";
import bcrypt from 'bcrypt'

export async function getAuthenticatedUser(req:Request, res:Response, next: NextFunction){
    const authenticatedUserId = req.session.userId
    try{
        if(!authenticatedUserId){
            throw createHttpError(401, "User not authenticated")
        }

        const user = await User.findById(authenticatedUserId).select("+email").exec()
        res.json(user)
    }catch(error){
        next(error)
    }
}

export async function createAccount(req:Request, res:Response, next:NextFunction){
    const username = req.body.username
    const email = req.body.email
    const passwordRaw = req.body.password

    try{
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, 'Parameters missing')
        }

        const existingEmail = await User.findOne({email: email}).exec()

        if(existingEmail){
            throw createHttpError(409, 'Email already associated with another account. Please login or use another.')
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10)
        const newUser = await User.create({
            username: username,
            email: email,
            password: passwordHashed,
        })

        req.session.userId = newUser._id

        res.status(201).json(newUser)
    }catch(error){
        next(error)
    }
}

export async function login(req:Request, res:Response, next: NextFunction){
    const email = req.body.email
    const password = req.body.password

    try{
        if(!email || !password){
            throw createHttpError(400, "Parameters missing")
        }

        //we excluded the email and password info by default so we need to include
        const user = await User.findOne({email:email}).select("+password +email").exec()

        if(!user){
            throw createHttpError(401, "Invalid email or password")
        }

        //use bcrypt to compare passwords so it can run the hash function
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            throw createHttpError(401, "Invalid email or password")
        }

        req.session.userId = user._id
        res.status(201).json(user)
    }catch(error){
        next(error)
    }

}

export async function logout(req:Request, res:Response, next: NextFunction){
    req.session.destroy(error =>{
        if(error){
            next(error)
        }
        else{
            res.sendStatus(200)
        }
    })
}

