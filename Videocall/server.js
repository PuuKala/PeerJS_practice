const PeerServer = require('peer').PeerServer;
const server = PeerServer({
    port: 9000
});

server.on('connection', (client) => {
    console.log("Connection established:");
    console.log(client);
});

server.on('disconnect', (client) => {
    console.log("Client disconnected:");
    console.log(client);
});