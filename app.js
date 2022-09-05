const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
require('dotenv').config()

const userController = require('./controllers/user')


app.use(cors())
app.use(express.json())

app.get('/', (reg, res) => {res.json({message: 'Welcome to utilitiy billionare backend'})})
app.post('/results', userController.sendResults)
app.get('/leaderboard', userController.fetchLeaderboard)

const server = http.createServer(app)


const url = 'https://utility-billionare.netlify.app/'
// const url = 'http://192.168.0.14:5173/'
const io = new Server(server, {
    cors: {
        origin: url,
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    })

})


module.exports = app;
