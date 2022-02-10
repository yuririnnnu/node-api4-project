const { nanoid } = require('nanoid')

function getId() {
  return nanoid().slice(0, 5)
}
const initializeUsers = () => ([
    { id: getId(), username: 'Happy', password: 'hero' },
    { id: getId(), username: 'Lucky', password: 'super hero' },
  ])
  
  let users = initializeUsers()

  const find = () => {
    return Promise.resolve(users)
  }

  const insert = ({ username, password }) => {
    const newUser = { id: getId(), username, password }
    users.push(newUser)
    return Promise.resolve(newUser)
  }
  
  module.exports = { find, insert }