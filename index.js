const server = require('./app')
const connectDB = require('./db/connect')
require('dotenv').config()

const port = process.env.PORT || 5000

const startDatabaseAndServer = async () => {
    
        await connectDB(process.env.MONGO_URI)
            .then(() => console.log('Connected to database...'))
            .then(server.listen(port))
            .then(() => console.log(`Server is listening to port ${port}...`))
            .catch(error => console.log('Can\'t connect to db or server: ', error))
            
}

startDatabaseAndServer()
