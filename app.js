const express = require('express')
const app = express()
const cors = require('cors')

const userController = require('./controllers/user')

app.use(cors())

app.use(express.json())

app.get('/', (reg, res) => {res.json({message: 'Welcome to utilitiy billionare backend'})})
app.post('/results', userController.sendResults)
app.get('/leaderboard', userController.fetchLeaderboard)

module.exports = app;
