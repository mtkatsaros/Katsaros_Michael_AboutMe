import {NextFunction, Request, Response} from 'express'
import createHttpError from 'http-errors'
import Project from '../models/Project'
import mongoose from 'mongoose';
import { assertIsDefined } from '../utils/assertIsDefined';
import User from "../models/User";



export async function createProject(req: Request, res: Response, next: NextFunction){
    const authenticatedUserId = req.session.userId
    
    const title = req.body.title
    const date = req.body.date
    const description = req.body.description
    const github = req.body.github
    
    try{
        assertIsDefined(authenticatedUserId)
        const user = await User.findById(authenticatedUserId)
        const isAdmin = user?.admin

        if(isAdmin !== "true"){
            next(createHttpError(401, 'User not authorized'))
        }

        const newProj = new Project({
            title: title,
            date: date,
            description: description,
            github: github,
        });
        
        const createdProj = await newProj.save()
        res.json(createdProj)    
    }
    catch(error){
        next(error)
    }

}

export async function getProjects(req: Request, res:Response){
    const projects = await Project.find().sort({date: -1, title: 1})
    res.json(projects)
}

export async function updateProject(req:Request, res:Response, next: NextFunction){

    const authenticatedUserId = req.session.userId

    
    try{
        const projectId = req.params.projectId
        const title = req.body.title
        const date = req.body.date
        const description = req.body.description
        const github = req.body.github
        
        assertIsDefined(authenticatedUserId)
        const user = await User.findById(authenticatedUserId)
        const isAdmin = user?.admin

        if(isAdmin !== "true"){
            next(createHttpError(401, 'User not authorized'))
        }

        try{
            if(!mongoose.isValidObjectId(projectId)){
                throw createHttpError(400, 'Invalid project id')
            }
            if(!title || !date || !description){
                throw createHttpError(400, 'Must have title, date, and description')
            }

            const project = await Project.findById(projectId)

            if(!project){
                throw createHttpError(404, 'Project not found')
            }

            project.title = title
            project.date = date
            project.description = description
            project.github = github

            const updatedProject = await project.save()

            res.status(200).json(updatedProject)
        }catch(error){
            next(error)
        }     
    }
    catch(error){
        next(error)
    }

    
    
}

export async function deleteProject(req:Request, res:Response, next: NextFunction){

    const authenticatedUserId = req.session.userId
    
    try{
        assertIsDefined(authenticatedUserId)
        const user = await User.findById(authenticatedUserId)
        const isAdmin = user?.admin

        if(isAdmin !== "true"){
            next(createHttpError(401, 'User not authorized'))
        }

        const projectId = req.params.projectId
        const project = await Project.findByIdAndDelete(projectId)
        res.json(project)     
    }
    catch(error){
        next(error)
    }

    
}