import dotenv from "dotenv";
dotenv.config()
import {NextFunction, Request, Response} from 'express'
import nodemailer from 'nodemailer'
import env from '../utils/validateEnv'

export async function sendMessage(req:Request, res: Response, next: NextFunction){
    try{
        const {name, email, message} = req.body

        const transporter = nodemailer.createTransport({
            host: 'smtp.titan.email',
            port: 587,
            secure: false,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASSWORD,
            }
        })

        const mailOptions = {
            from: env.EMAIL_USER,
            to: 'mtkatsaros@gmail.com',
            subject: 'Business Inquiry',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        } 

        await transporter.sendMail(mailOptions)

        res.status(200).json({success: true, message: 'Email sent successfully'})
    }catch(error){
        res.status(500).json({success: false, message: 'Failed to send email'})
        next(error)
    }
    
}

export async function confirmationMessage(req:Request, res: Response, next: NextFunction){
    try{
        const {name, email, message} = req.body

        const transporter = nodemailer.createTransport({
            host: 'smtp.titan.email',
            port: 587,
            secure: false,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASSWORD,
            }
        })

        const mailOptions = {
            from: env.EMAIL_USER,
            to: email,
            subject: 'Message Confirmation',
            text: `Thank you for messaging Michael Katsaros. Please expect a reply within 48 hours.\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        } 

        await transporter.sendMail(mailOptions)

        res.status(200).json({success: true, message: 'Email sent successfully'})
    }catch(error){
        res.status(500).json({success: false, message: 'Failed to send email'})
        next(error)
    }
}