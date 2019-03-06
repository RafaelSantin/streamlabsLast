const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require('path');

const API_PORT = 3001;
const app = express();
const router = express.Router();

const io = require('socket.io')();

io.listen(3002);

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('subscribeToTimer', function (a, b) {
    io.on('connection', (client) => {
        client.on('subscribeToTimer', (interval) => {
            console.log('client is subscribing to timer with interval ', interval);

                client.emit('timer', new Date());

        });
    });
});


// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger("dev"));
app.use(express.static(path.join(__dirname, 'client/build')));



// this is our get method
// this method fetches all available data in our database
router.get("/api/teste", (req, res) => {
    return res.json({
        success: true,
        data: data
    });
    // Data.find((err, data) => {
    //     if (err) return res.json({ success: false, error: err });
    //     return res.json({ success: true, data: data });
    // });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
    // const { id, update } = req.body;
    // Data.findOneAndUpdate(id, update, err => {
    //     if (err) return res.json({ success: false, error: err });
    //     return res.json({ success: true });
    // });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    // const { id } = req.body;
    // Data.findOneAndDelete(id, err => {
    //     if (err) return res.send(err);
    //     return res.json({ success: true });
    // });
});

// this is our create methid
// this method adds new data in our database
router.post("/api/putData", (req, res) => {
        var javascriptObject = 'oiii';

        io.emit("someName", javascriptObject);
        res.send({
            test: "Some message"
        });

        // io.on('connection', (client) => {
        //     client.on('subscribeToTimer', (interval) => {
        //         console.log('client is subscribing to timer with interval ', interval);
             
        //             client.emit('timer', new Date());
               
        //     });
        // });
        // return res.json({
        //     success: true
        // });

    // let data = new Data();

    // const { id, message } = req.body;

    // if ((!id && id !== 0) || !message) {
    //     return res.json({
    //         success: false,
    //         error: "INVALID INPUTS"
    //     });
    // }
    // data.message = message;
    // data.id = id;
    // data.save(err => {
    //     if (err) return res.json({ success: false, error: err });
    //     return res.json({ success: true });
    // });
});

// append /api for our http requests
app.use("/api", router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));