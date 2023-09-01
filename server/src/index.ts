import dotenv from 'dotenv'
dotenv.config()

import express, {Request, Response} from "express"
import mongoose from "mongoose"
const app = express()
const port = 50000
import cors from 'cors'
//import cookieParser from 'cookie-parser'
import projApp from './routes/projectRoutes'
import reviewApp from './routes/reviewRoutes'
import authApp from './routes/authRoutes'


app.use(cors({
    origin: "*",
}))
app.use(express.json())
//app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use(projApp)
app.use(reviewApp)
app.use(authApp)

app.get('/', (req:Request, res:Response)=>{
    res.send('Hello there!')
})

mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log(`listening on port ${port}`)
    app.listen(port)
})
