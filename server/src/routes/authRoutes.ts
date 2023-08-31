import express from 'express'
import { createAccount, login } from '../controllers/AuthenticationController'
const app = express()

app.post('/create', createAccount)
app.post('/login', login)

export default app