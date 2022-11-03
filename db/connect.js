const mongoose = require('mongoose')

async function connectDB(url) {
   
    const success = await mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
   return success;
}

module.exports = connectDB
