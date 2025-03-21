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
import contactApp from './routes/contactRoutes'
import session from 'express-session'
import env from './utils/validateEnv'
import MongoStore from 'connect-mongo'


app.use(cors({
    origin: 'https://michaeltkatsaros.com',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}))
app.use(express.json())

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    store: MongoStore.create({
        mongoUrl: env.MONGO_URL
    }),
}))
app.use(express.urlencoded({extended: false}))

app.use("/projects", projApp)
app.use("/endorsements", reviewApp)
app.use("/user", authApp)
app.use("/contact", contactApp)

app.get('/', (req:Request, res:Response)=>{
    res.send('Hello there!')
})
app.get('/serve404', (req:Request, res:Response)=>{
    res.status(404).send('Not Found')
})

mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log(`listening on port ${port}`)
    app.listen(port)
})
