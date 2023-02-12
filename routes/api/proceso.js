import { Router } from 'express'
import { fork } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const router = Router()

const __dirname = dirname(fileURLToPath(import.meta.url))

router.get('/ramdom', (req, res) => {
  const { cant } = req.query
  const self = Number(cant) || 100000000
  const computo = fork(join(__dirname, './utils/computo.js'))
  computo.on('message', msg => {
    if (msg === 'listo') {
      computo.send(self)
    } else {
      res.json(msg)
    }
  })
})

export default router
