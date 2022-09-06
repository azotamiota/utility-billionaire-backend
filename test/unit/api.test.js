const supertest = require("supertest");
const mongoose = require('mongoose');
const app = require("../../app");
require('dotenv').config()

describe("API", () => {
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
        api = app.listen(3030)
    })
  });

  afterAll((done) => {
    api.close(done);
    mongoose.disconnect();
  });

  describe("GET requests", () => {
    it("it reponds to a GET request at '/' with a 200 status", (done) => {
      supertest(api).get("/").expect(200, done);
    });

    it("it retrieves 200 status of GET request at '/dashboard'", (done) => {
      supertest(api).get("/leaderboard").expect(200, done);
    });


  });
})
