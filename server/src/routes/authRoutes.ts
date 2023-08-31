import express from 'express'
import { createAccount } from '../controllers/AuthenticationController'
const app = express()

app.post('/create', createAccount)

export default app