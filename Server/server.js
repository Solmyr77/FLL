const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 1234;

let visits = 100;

let users = [];

app.post("/track-visit", (req, res) => {
    console.log(`User visit: ${req.body.timestamp} - ${req.body.client}`)

    if (!users.includes(req.body.client)) {
        visits++;
    }

    users.push(req.body.client);

    res.send({status: "success", message: visits})
})

app.listen(port, () => {
    console.log("Server listening on port: ", port)
})