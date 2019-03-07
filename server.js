const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require('path');

const API_PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));


router.post("/webhook", (req, res) => {
    console.log(req.body);
        var javascriptObject = req.body.data[0].from_name + ' is Following ' + req.body.data[0].to_name;

        io.emit("getfollowers", javascriptObject);
});

router.get('/webhook', (req, res) => {
    res.send(req.query['hub.challenge'])
})


app.use("/api", router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });

// launch our backend into a port
server.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));