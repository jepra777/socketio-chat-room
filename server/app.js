const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 3001
const io = require('socket.io')(server)
const { addUser, getUser, delUser, getUsers} = require('./controllers/usersController')

app.use(cors())

io.on('connection', (socket) => {
    socket.on('login', ({name, room}, callback) => {
        const {user, error} = addUser(socket.id, name, room)
        if(error) return callback(error)
        socket.join(user.room)
        socket.to(room).emit('notification', 
        { 
            title: 'Someone\'s here',
            description: `${user.name} just entered the room`
        })
        io.to(room).emit('users', getUsers(room))
        callback()
    })

    socket.on('sendMsg', msg => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {
            user: user.name,
            text: msg
        })
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
        const user = delUser(socket.id)
        if (user) {
            io.to(user.room).emit('notification', 
            {
                title: 'Someone just left',
                description: `${user.name} just left the room`
            })
            io.to(user.room).emit('users', getUsers(user.room))
        }
    })

})

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

server.listen(PORT, () => {
    console.log(`Listening to *:${PORT}`)
})