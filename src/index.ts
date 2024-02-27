import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerTasks from './routes/tasks'

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

app.use(routerTasks)

app.listen(PORT, () => {
  console.log(`Listen on port: ${PORT}`)
})
