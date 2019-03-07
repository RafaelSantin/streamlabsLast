import openSocket from 'socket.io-client';
const socket = openSocket('https://streamlabslast.herokuapp.com/');

function subscribeToTimer(cb) {    
    //console.log(cb);
    socket.on('getfollowers', newfollow => cb(null, newfollow))
}
export {
    subscribeToTimer
};