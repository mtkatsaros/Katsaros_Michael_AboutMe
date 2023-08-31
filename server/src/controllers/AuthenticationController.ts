import { Request, Response } from "express";
import mongoose from "mongoose";
import Account from "../models/Account";

export async function createAccount(req:Request, res:Response){
    const newAccount = new Account({
        user: req.body.user,
        email: req.body.email,
        password: req.body.password,
    })

    const createdAccount = await newAccount.save()
    res.json(createdAccount)
}

export async function login(req:Request, res:Response){
    const {email, password} = req.body
    await Account.findOne({email: email}).then((user) =>{
        if(user){
            if(user.password === password){
                res.json("success")
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
