import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3002');

function subscribeToTimer(cb) {    
    socket.on('someName', teste => cb(null, teste))
}
export {
    subscribeToTimer
};