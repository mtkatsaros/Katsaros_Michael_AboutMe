import {config} from 'dotenv'
config()

import express, {Request, Response} from "express"
import mongoose from "mongoose"
const app = express()
const port = 50000
import cors from 'cors'
import projApp from './routes/projectRoutes'
import reviewApp from './routes/reviewRoutes'


app.use(cors({
    origin: "*",
}))
app.use(express.json())
app.use(projApp)
app.use(reviewApp)

app.get('/', (req:Request, res:Response)=>{
    res.send('Hello there!')
})

mongoose.connect(process.env.MONGO_URL!).then(()=>{
    console.log(`listening on port ${port}`)
    app.listen(port)
})
