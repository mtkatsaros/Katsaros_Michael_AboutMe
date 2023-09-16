import express from 'express'
import { createAccount, login, getAuthenticatedUser, logout } from '../controllers/AuthenticationController'
import { requiresAuth } from '../middleware/auth'
const app = express()

app.get('/', requiresAuth, getAuthenticatedUser)
app.post('/create', createAccount)
app.post('/login', login)
app.post('/logout', logout)


export default app