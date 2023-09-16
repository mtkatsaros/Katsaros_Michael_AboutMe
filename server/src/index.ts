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
import session from 'express-session'
import env from './utils/validateEnv'
import MongoStore from 'connect-mongo'


app.use(cors({
    origin: '*',
}))
app.use(express.json())

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: false,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_URL
    }),
}))
app.use(express.urlencoded({extended: false}))

app.use("/projects", projApp)
app.use("/reviews", reviewApp)
app.use("/user", authApp)

app.get('/', (req:Request, res:Response)=>{
    res.send('Hello there!')
})

mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log(`listening on port ${port}`)
    app.listen(port)
})
