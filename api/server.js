const bcrypt = require('bcrypt')
const express = require('express')
const server = express()
const User = require('./User/user-model')

server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
    .then(user => {
        res.json(user)
    })
    .catch(e => {message: e.message})
})

server.post('/api/register', async (req, res) => {
    const { username, password } = req.body
    console.log(username)
    if(!username || !password) {
        res.status(500).json({message: "Username and password must be inputted"})
    } else {
        const rounds = 10
        bcrypt.hash(password, rounds, (err, hash) => {
          if (err) {
            console.error(err)
            return
          }
          User.insert({username:username, password:hash})
          .then(user => {
              res.json(user)
          })
          .catch(err => console.log(err))
        })   
    }
})

server.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if(!username || !password) {
        res.status(500).json({message: "must input username and password"})
    } else {
        res.json({message: "Welcome to our world!"})
    }
})
server.get('/', async (req, res) => {
    try {
      const messageOfTheDay = process.env.MOTD || 'Welcome to our World!';
      res.status(200).json({ motd: messageOfTheDay }); 
    } catch (error) {
      console.error('\nERROR', error);
      res.status(500).json({ error: 'Something bad happen in server' });
    }
  });

module.exports = server;