import express from 'express'
import { createAccount, login, getAuthenticatedUser, logout } from '../controllers/AuthenticationController'
const app = express()

app.get('/user', getAuthenticatedUser)
app.post('/user/create', createAccount)
app.post('/user/login', login)
app.post('/user/logout', logout)


export default app