import {NextFunction, Request, Response} from 'express'
import createHttpError from 'http-errors'
import Project from '../models/Project'
import mongoose from 'mongoose';

export async function createProject(req: Request, res: Response){
    
    const newProj = new Project({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        github: req.body.github,
    });
    const createdProj = await newProj.save()
    res.json(createdProj)

}

export async function getProjects(req: Request, res:Response){
    const projects = await Project.find()
    res.json(projects)
}

export async function updateProject(req:Request, res:Response, next: NextFunction){
    const projectId = req.params.projectId
    const title = req.body.title
    const date = req.body.date
    const description = req.body.description
    const github = req.body.github


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

export async function deleteProject(req:Request, res:Response){
    const projectId = req.params.projectId
    const project = await Project.findByIdAndDelete(projectId)
    res.json(project)
}