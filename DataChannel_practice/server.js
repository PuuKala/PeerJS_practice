'use strict';

// Get Express, path and PeerJS server and initialize variables
const express = require('express');
var app = express();
const path = require('path');
var ExpressPeerServer = require('peer').ExpressPeerServer;
const port = 9000;
const options = {
    debug: true
}

// Handle GET requests
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/index.js', function(req,res){
    res.sendFile(path.join(__dirname+'/index.js'));
});
app.get('/peerjs.js', function(req,res){
    res.sendFile(path.join(__dirname+'/../peerjs/dist/peerjs.min.js'));
});
app.get('/peerjs.js.map', function(req,res){
    res.sendFile(path.join(__dirname+'/../peerjs/dist/peerjs.min.js.map'));
});

// Listen the port
var server = app.listen(port);

// Use PeerJS server at /api path
app.use('/api', ExpressPeerServer(server, options));

// NOTE: The PeerJS server is a bit incomplete in the NPM version.
// The heartbeat signal isn't recognized in the server and thus it clutters the console
// with error messages. It does still work though.

// Alternatively, if you want to use PeerJS separately, run "peerjs -p 9000" instead.
// NPM installs this too to your path when installing PeerJS server with "npm install peer".
// Toss the /api path from index.js when using separately.