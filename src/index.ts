import express from 'express'
import dotenv from 'dotenv'
import { mockUser } from './constants'

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/api/', (request, response) => {
  return response.send(mockUser)
})

app.post('/api/', (request, response) => {
  const { name, lastName } = request.body
  if (!name || !lastName) {
    return response
      .status(401)
      .send({ message: 'error no se puede enviar en este formato' })
  }

  const newUser = {
    id: mockUser[mockUser.length - 1].id + 1,
    name,
    lastName
  }
  mockUser.push(newUser)
  return response.status(200).json({ message: 'ok' })
})

app.put('/api/:id', (request, response) => {
  const paramId = request.params.id
  const { name, lastName } = request.body
  if (!name || !lastName) {
    return response
      .status(401)
      .send({ message: 'error no se puede enviar en este formato' })
  }
  const idParams = parseInt(paramId)
  if (isNaN(idParams)) return response.status(400).json({ message: 'error' })

  const indexUser = mockUser.findIndex(user => user.id === idParams)
  if (indexUser === -1) return response.status(400).json({ message: 'index not found' })
  const userModified = {
    id: idParams,
    name,
    lastName
  }
  mockUser[indexUser] = userModified
  return response.status(200).json({ message: 'ok' })
})

app.delete('/api/:id', (request, response) => {
  const paramId = request.params.id
  const idParams = Number(paramId)
  if (isNaN(idParams)) return response.status(400).json({ message: 'error id' })

  const indexUser = mockUser.findIndex(user => user.id === idParams)
  if (indexUser === -1) return response.status(400).json({ message: 'index not found' })
  mockUser.splice(indexUser, 1)
  return response.status(200).json({ message: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}/api/`)
})
