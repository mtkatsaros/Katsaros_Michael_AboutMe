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
