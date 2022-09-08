const app = require('./app')
const http = require('http')
const {Server} = require('socket.io')
const connectDB = require('./db/connect')
require('dotenv').config()

const server = http.createServer(app)

const url = 'https://utility-billionare.netlify.app'
// const url = 'http://localhost:5173'
let players = []
const finalResults = []
let questions = [
// { room: '123',questions: []},
// { room: 'rooom3',questions: []},
// { room: 'asda',questions: []},
// { room: 'ro3',questions: []},
// { room: 'agend',questions: []},
]

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
        let checkIfTheRoomExits = false
        for(let question of questions){
            if(question.room == data.room) {
                checkIfTheRoomExits = true
            }
        }
        if (!checkIfTheRoomExits) questions.push(data)
        // if (flag) io.emit('room e')
    })
    socket.on('join_room', (userData) => {
        socket.join(userData.room)
        let counter = 0
        for(let player of players) {
            if(player.room == userData.room) counter++
        }
        if (counter >=4) io.emit('joined', 'sorry, too many players')
        if(players.indexOf(userData) == -1){
            //check if the player already exists
            players.push(userData)
            const newArray = questions.filter(function (el) {
                return el.room == userData.room
              });
            const playersArr = []
            for(let player of players) {
                player.room == userData.room ? playersArr.push(player) : false
            }

            io.to(userData.room).emit('joined', {players: playersArr, questions: newArray}) 
        }
        setTimeout(() => {
            socket.disconnect()
            players = players.filter(player => {
                console.log('player: ', player.room, player.username)
                console.log('userData: ', userData.room, userData.username)
                console.log(player.room != userData.room)
                console.log(player.username != userData.username)
                return player.room != userData.room && player.username != userData.username
            });
            console.log('players left after timeout', players)
        }, 1800000)
    })
    socket.on('start_game', (room) => {
        io.to(room).emit('begin')
    })

    let counter = 0
    
    socket.on('send_result', data => {
        if (data.currentPlayers.length > counter) {
            counter++;
            finalResults.push({id: counter, username: data.username, score: data.currentMoney})
            console.log('finalResults until the counter is less than players: ', finalResults)
        } else {
            console.log('these final results are sent: ', finalResults)
        }
        console.log('data in send_result: ', data);
    })
    
    socket.on('page_loaded', (room) => {
        io.to(room).emit('final_scores', finalResults)
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
