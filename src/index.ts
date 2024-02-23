import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { usersRoutes, productsRoutes } from './routes'

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(usersRoutes)
app.use(productsRoutes)

app.listen(PORT)
console.log(`Listen on port: ${PORT}`)
