const supertest = require('supertest')
const app = require('../../../app')
const mongoose = require('mongoose');
require('dotenv').config()

describe('User controllers', () => {
    let api;

    beforeAll(async () => {
        await mongoose
            .connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                // useCreateIndex: true,
                // useFindAndModify: false,
                useUnifiedTopology: true,
            })
            .then(() => {
                api = app.listen(5050)
            })
    });

    afterAll((done) => {
        console.log('Gracefully stopping the server');
        api.close(done);
    })

    it('it retrieves users from database', () => {
        supertest(api).get('/leaderboard').expect((res) => {
            expect(res.status).toBe(200)
        })
    })

    // it("it checks if it gets one users", async () => {
    //     const response = await supertest(api).get('/dashboard/admin2')  
    //         expect(response.statusCode).toEqual(201)
    // })
    
    // it("it checks a sample credential is correct", async () =>{

    //     const response = await supertest(api).post('/login')
    //     .send({
    //         "username": "admin2",
    //         "password": "password2"
    //     })
    //     .set('Accept', 'application/json');

    //     expect(response.body.message).toBe('Successfully logged in')
    //     expect(response.body.success).toBe(true)

    // })

    // it("it checks a sample credential is incorrect", async () =>{

    //     const response = await supertest(api).post('/login')
    //     .send({
    //         "username": "heiwufhiuehfwkuhfkjwbfbnwsjknfhyuwbfiuwbe",
    //         "password": "kerghuwvbhoanviuwhoinouijqinfhuihqiunfuwh"
    //     })
    //     .set('Accept', 'application/json');

    //     expect(response.body.success).toBe(false)
    //     expect(response.status).toBe(401)

    // })


    // it('it creates a new user', async () => {
    //     const response = await supertest(api).post('/register')
    //         .send({
    //             "username": "admin98",
    //             "password": "password99"
    //         })
    //         .set('Accept', 'application/json');

    //     expect(response.headers["content-type"]).toMatch(/json/);
    //     expect(response.body.username).toBeDefined();
    //     expect(response.body.message).toBeDefined();
    //     expect(response.statusCode).toEqual(201)
    // })

    // it('It checks a sample register is false', async () => {
    //     const response = await supertest(api).post('/register')
    //         .send({
    //             "username": "adminFalse",
    //             "password": false
    //         })
    //         .set('Accept', 'application/json');

    //     expect(response.headers["content-type"]).toMatch(/json/);
    //     expect(response.body.message).toStrictEqual({});
    //     expect(response.statusCode).toEqual(500)
    // })

    // it("it checks if it shows a user habit", async () => {
    //     const response = await supertest(api).get('/dashboard/admin2/habits')  
    //         expect(response.statusCode).toEqual(200) 
    // })
    

})



