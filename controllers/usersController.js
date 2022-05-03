const users = []
const addUser = (id, name, room) => {
    const existsUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if(existsUser) return { error: "Username has already taken"}
    if(!name && !room) return {error: "Username and room are required"}
    if(!name) return {error: "Username is required"}
    if(!room) return {error: "Room is required"}
    if(!name) return {error: "Username is required"}

    const user = {id, name, room}
    users.push(user)
    return { user }
}

const getUser = id => {
    let user = users.find(user => user.id === id)
    return user
}

const delUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if(index != -1) return users.splice(index,1)[0]
}

const getUsers = (room) => {
    users.filter(user => user.room === room)
}

module.exports = { addUser, getUser, delUser, getUsers }