import {config} from 'dotenv'
import { createProject } from './controllers/ProjectController'
config()

import express, {Request, Response} from "express"
import mongoose from "mongoose"
const app = express()
const port = 50000
import cors from 'cors'

app.use(cors({
    origin: "*",
}))
app.use(express.json())

app.get('/', (req:Request, res:Response)=>{
    res.send('Hello there!')
})

app.post('/projects/create', createProject)

mongoose.connect(process.env.MONGO_URL!).then(()=>{
    console.log(`listening on port ${port}`)
    app.listen(port)
})
