const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 3001

app.use(cors())

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

server.listen(PORT, () => {
    console.log(`Listening to *:${PORT}`)
})