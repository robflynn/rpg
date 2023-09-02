import express from 'express'
import serveStatic from 'serve-static'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(serveStatic(path.join(__dirname, 'dist')))

const port = process.env.PORT || 8080

console.log("Listening on port " + port + "...")
app.listen(port)
