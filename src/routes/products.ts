import { Router } from 'express'

const router = Router()

router.get('/api/products/', (req, res) => {
  res.send('Todo esta genial')
})

export default router
