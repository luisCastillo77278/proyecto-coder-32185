import { Router } from 'express'
import { platform, pid, version, memoryUsage, cwd, execPath, argv } from 'node:process'

const route = Router()

route.get('/info', (_req, res) => {
  res.json({
    platform,
    version,
    pid,
    memory: memoryUsage(),
    cwd: cwd(),
    args: argv,
    execPath
  })
})

export default route
