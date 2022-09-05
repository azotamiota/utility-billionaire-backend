const User = require('../models/User')

const sendResults = async (req, res) => {

    try {
        const username = req.body.username
        const score = req.body.score
        console.log(username, score)
        const user = await User.create({'username': username, 'score' : score})  
        res.status(201).json({username: username,  message: 'User created'})                
    } catch (error) {                       
        res.status(500).json({message: error})
    }

}

const fetchLeaderboard = async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json({users})
    } catch (error) {
        res.status(404).json({message: error})
    }
}

module.exports = {
    sendResults,
    fetchLeaderboard
}
