const User = require('..models/User')

const sendResults = async (req, res) => {

    try {
        const username = req.body.username
        const points = req.body.points
        const user = await User.create({'username': username, 'points' : points})  
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
