import dotenv from "dotenv";
dotenv.config()
import { Request, Response } from "express";
import User from "../models/User";
import jwt, {Secret} from 'jsonwebtoken'



export async function createAccount(req:Request, res:Response){
    const newAccount = new User({
        username: req.body.user,
        email: req.body.email,
        password: req.body.password,
    })

    const createdAccount = await newAccount.save()
    res.json(createdAccount)
}

export async function login(req:Request, res:Response){
    const {email, password} = req.body
    await User.findOne({email: email}).then((user) =>{
        if(user){
            if(user.password === password){
                jwt.sign({email: user.email}, process.env.JWT_SECRET as Secret, {}, (err, token) =>{
                    if(err){
                        throw err
                    }
                    res.cookie('token', token).json(user)
                })
            }
            //if this statement fails it's a password error
            else{
                res.json("password")
            }
        }
        //if the email is not found there's an email error
        else{
            res.json("email")
        }
        
    })

}
