import express from 'express'
import { sendMessage, confirmationMessage} from '../controllers/ContactController'
const app = express()

app.post('/', sendMessage)
app.post('/confirm', confirmationMessage)

export default app