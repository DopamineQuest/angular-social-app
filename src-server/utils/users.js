users = []

const clearUsers = () => {
  users = [];
}

const addUser = ({ id, username, room }) => {

  console.log("adding user!!")
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if (existingUser) {
        return {
            error: 'Username is in use'
        }
    }

    const user = { id, username, room}
    users.push(user)
    return { user }
}

const removeUser = ( id ) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if( index !== -1 ) {
        return users.splice(index, 1)[0]
    }
}

const getUser = ( id ) => {
    return users.find((user) => {
        return user.id === id
    })
}

const getUserByUsername = ( username ) => {

  console.log("FINDING IN USERS.jcs")


  return users.find((user) => {
    console.log('cmon name',user.username)
    return user.username === username
  })
}

const getUsersInRoom = ( room ) => {
    return users.filter((user) => {
        return user.room === room
    })
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getUserByUsername
}
