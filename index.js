const app = require('./app')
const http = require('http')
const {Server} = require('socket.io')
const connectDB = require('./db/connect')
require('dotenv').config()

const server = http.createServer(app)

const url = 'https://utility-billionare.netlify.app'
// const url = 'http://192.168.1.23:5173'
let players = []
let questions = []
const io = new Server(server, {
    cors: {
        origin: url,
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    io.emit('request', () => {console.log(players)})
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    })
    socket.on("send_question", (data) => {
        console.log(data)
        let flag = false
        for(let question of questions){
            if(question.room == data.room) {
                flag = true
            }
        }
        if (!flag) questions.push(data)
    })
    socket.on('join_room', (userData) => {
        let counter = 0
        for(let player of players) {
            if(player.room == userData.room) counter++
        }
        if (counter >=4) io.emit('joined', 'sorry, too many players')
        if(players.indexOf(userData) == -1){
            players.push(userData)
            const newArray = questions.filter(function (el) {
                return el.room == userData.room
              });
            const playersArr = []
            for(let player of players) {
                player.room == userData.room ? playersArr.push(player) : false
            }

            io.emit('joined', {players: playersArr, questions: newArray}) 
        }
        // socket.join(room)
        console.log('user: '+userData.username + ' joinig room ' + userData.room)
    })
    socket.on('start_game', data => {
        io.emit('begin')
    })
})

const port = process.env.PORT || 5000

const startDatabaseAndServer = async () => {
    
        await connectDB(process.env.MONGO_URI)
            .then(() => console.log('Connected to database...'))
            .then(server.listen(port))
            .then(() => console.log(`Server is listening to port ${port}...`))
            .catch(error => console.log('Can\'t connect to db or server: ', error))
            
}

startDatabaseAndServer()
