import { Router } from 'express'
import { taskSchema } from '../schemas/task'
import { pool } from '../db/connection'
import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
const router = Router()

interface RowTask extends RowDataPacket {
  task_id: number
  task: string
  complete: number
}

router.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query<RowTask[]>('SELECT * FROM tasks')
    res.json(rows)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/api/tasks/:id', async (req, res) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM tasks WHERE task_id = ?',
      [parseInt(req.params.id)]
    )
    res.json(rows[0])
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/api/tasks', async (req, res) => {
  try {
    const { task, complete } = taskSchema.parse(req.body)
    const [rows] = await pool.query<ResultSetHeader>(
      'INSERT INTO tasks (task, complete) VALUES ( ? , ? )',
      [task, complete]
    )
    const response = {
      task_id: rows.insertId,
      task,
      complete: complete ? 1 : 0
    }
    res.json(response)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/tasks/:id', async (req, res) => {
  try {
    const { task, complete } = taskSchema.parse(req.body)
    const [rows, fields] = await pool.query<ResultSetHeader>(
      'UPDATE tasks SET task = ? , complete = ? WHERE task_id = ? ',
      [task, complete, parseInt(req.params.id)]
    )
    console.log(rows, fields)
    res.json({ message: 'update' })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/api/tasks/:id', async (req, res) => {
  try {
    const [rows, fields] = await pool.query<ResultSetHeader>('DELETE FROM tasks WHERE task_id = ?', [
      parseInt(req.params.id)
    ])
    console.log(rows, fields)
    res.json({ message: 'deleted' })
  } catch (error) {
    res.send(error)
  }
})

export default router
