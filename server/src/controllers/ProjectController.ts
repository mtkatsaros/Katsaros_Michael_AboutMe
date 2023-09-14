import {Request, Response} from 'express'
import Project from '../models/Project'



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

export async function deleteProject(req:Request, res:Response){
    const projectId = req.params.projectId
    const project = await Project.findByIdAndDelete(projectId)
    res.json(project)
}