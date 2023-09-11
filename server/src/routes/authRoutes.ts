import express from 'express'
import { createAccount, login, getAuthenticatedUser, logout } from '../controllers/AuthenticationController'
const app = express()

app.get('/user', getAuthenticatedUser)
app.post('/create', createAccount)
app.post('/login', login)
app.post('/logout', logout)


export default app