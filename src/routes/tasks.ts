import { Router } from 'express'
import { taskSchema } from '../schemas/task'
import { pool } from '../db/connection'
import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
const router = Router()

router.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tasks;')
    res.json(rows)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/api/tasks/:id', async (req, res) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM tasks WHERE task_id = ${req.params.id};`)
    res.json(rows[0])
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/api/tasks', async (req, res) => {
  try {
    const body = taskSchema.parse(req.body)
    await pool.query<ResultSetHeader>(`INSERT INTO tasks (task, complete) VALUES ('${body.task}', ${body.complete === 1 ? 'TRUE' : 'FALSE'})`)
    res.send({ message: 'ok' })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put('/api/tasks/:id', async (req, res) => {
  try {
    const body = taskSchema.parse(req.body)
    await pool.query<ResultSetHeader>(`UPDATE tasks SET task='${body.task}', complete = ${body.complete === 1 ? 'TRUE' : 'FALSE'} WHERE task_id = ${req.params.id}`)
    res.json({ message: 'ok' })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete('/api/tasks/:id', async (req, res) => {
  await pool.query<ResultSetHeader>(`DELETE FROM tasks WHERE task_id = ${req.params.id}`)
  res.json({ message: 'delete' })
})

export default router
