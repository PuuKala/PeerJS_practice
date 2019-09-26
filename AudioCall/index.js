// Initializing variables
var id = document.getElementById('id_selection').innerHTML;
var mediastream = null;
var peer = null;

// Defining media options
const constraints = { audio: true, video: false };

// Get audio
navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
        mediastream = stream;
    })
    .catch(function (err) {
        console.log(err.name + ":", err.message);
    });

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
    peer = new Peer(id, { host: 'localhost', port: 9000 });
    peer.on('call', function (media) {
        media.on('stream', function (stream) {
            var audio = document.getElementById('remoteAudio');
            audio.srcObject = stream;
            audio.onloadedmetadata = function (e) {
                audio.play();
            };
        });
        media.answer(mediastream);
    });
};

// Call to Answerer
function call() {
    peer.call('Answerer', mediastream);
    var media = peer.call('Answerer', mediastream);
    media.on('stream', function (stream) {
        var audio = document.getElementById('remoteaudio');
        audio.srcObject = stream;
        audio.onloadedmetadata = function (e) {
            audio.play();
        };
    });
};
