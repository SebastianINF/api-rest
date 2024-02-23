import { Router } from 'express'
import { mockUser } from '../utils/mockUsers'
import { userSchema } from '../schemas/userSchema'

const router = Router()

router.get('/api/users/', (request, response) => {
  return response.send(mockUser)
})

router.post('/api/users/', (req, res) => {
  try {
    userSchema.parse(req.body)
    const { name, lastName } = req.body

    const newUser = {
      id: mockUser[mockUser.length - 1].id + 1,
      name,
      lastName
    }
    mockUser.push(newUser)
    return res.status(200).json({ message: 'succesfully' })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/users/:id', (request, response) => {
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

router.delete('/api/users/:id', (request, response) => {
  const paramId = request.params.id
  const idParams = Number(paramId)
  if (isNaN(idParams)) return response.status(400).json({ message: 'error id' })

  const indexUser = mockUser.findIndex(user => user.id === idParams)
  if (indexUser === -1) return response.status(400).json({ message: 'index not found' })
  mockUser.splice(indexUser, 1)
  return response.status(200).json({ message: 'ok' })
})
  
export default router
