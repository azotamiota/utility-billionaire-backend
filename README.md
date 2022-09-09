# Utility Billionaire Backend

## Installation & Usage

### Installation

Installation is not required as this app has been deployed.

### Usage

- If you'd like to use this app, please click [here](https://frontend.app/).
- Clone or Fork the repo if you'd like to have a closer look at the backend structure,
Please note that you cannot use the app on your local machine as it needs environment variables.

## Routes

### Deployed server URL

- https://utility-billionaire.herokuapp.com

### GET requests

- `/` - Welcome message
- `/leaderboard` - Returns all users from the database. Sample format:
```
{
"users": [
    {
      "_id": "6315c57ab0e97a8a5b84696e",
      "username": "paul123",
      "score": 30,
      "__v": 0
    },
    {
      "_id": "6315c5bbb0e97a8a5b846970",
      "username": "darren456",
      "score": 67,
      "__v": 0
    }]
}
```


### POST requests
- `/results` - To add a new user with scores or to update existing users' scores. Accepted `req.body` format: 
```
{
  "username" : "harry123",
  "score": 45
}
```

## Tests

- [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest) used for testing
- Run `npm run test` 
- Run `npm run cov` for coverage

## Wins and Challenges

### Wins

- Deployed to [Heroku](https://heroku.com)
- Database stored at [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- Socket.io dataflow

### Challenges

- Implement socket.io and make it work properly
