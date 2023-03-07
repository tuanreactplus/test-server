var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/local";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("local");
        const movies = database.collection("users");
        const query = {title: "Divine Comedy"};
        const movie = await movies.findOne(query);
        return movie
    } finally {
        await client.close();
    }
}

router.get("/", async (req, res, next) => {
    const data = await run();
    res.send(data);
});
router.post("/", (req, res) => {
    res.send("got a post request");
});
router.put("/", (req, res) => {
    res.send("got a put request");
});

router.delete("/", (req, res) => {
    res.send("got a delete request");
});

module.exports = router;
