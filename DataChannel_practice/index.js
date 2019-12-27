// Initializing variables
var id = document.getElementById('id_selection').innerHTML;
var connection = null;
var peer = null;

// ID change from button
function id_change() {
    var current_id = document.getElementById("id_selection").innerHTML;
    if (current_id === "Caller") {
        id = "Answerer";
    } else {
        id = "Caller";
    }
    document.getElementById('id_selection').innerHTML = id;
};

// Connect signaling server and listen for incoming calls
function start() {
    peer = new Peer(id, {
        host: location.hostname, port:location.port, path:'/api'
    });
    peer.on('connection', function (dataconnection) {
        connection = dataconnection;
        connection.on('data', function(data){
            console.log("Message received:", data);
            document.getElementById("chatbox").innerHTML = document.getElementById("chatbox").innerHTML + data + "<br />";
        });
    });
};

// Connect to Answerer
function connect() {
    connection = peer.connect('Answerer');
    connection.on('data', function (data) {
        console.log("Message received:", data);
        document.getElementById("chatbox").innerHTML = document.getElementById("chatbox").innerHTML + data + "<br />";
    });
};

// Send message
function sendText() {
    connection.send(document.getElementById("chatInput").value)
}