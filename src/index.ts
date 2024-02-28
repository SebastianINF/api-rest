import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerTasks from './routes/tasks'

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(routerTasks)
app.listen(PORT)
console.log(`Listen on port: ${PORT}`)
