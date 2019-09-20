var id = document.getElementById('id_selection').innerHTML;
const constraints = { audio: true, video: true };
var mediastream = null;
var peer = null;
navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
        var video = document.getElementById('localVideo');
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
        mediastream = stream;
    })
    .catch(function (err) {
        console.log(err.name + ":", err.message);
    });

function id_change() {
    var current_id = document.getElementById("id_selection").innerHTML;
    if (current_id === "Caller") {
        id = "Answerer";
    } else {
        id = "Caller";
    }
    document.getElementById('id_selection').innerHTML = id;
};

function start() {
    peer = new Peer(id, { host: 'localhost', port: 9000 });
    peer.on('call', function (media) {
        media.on('stream', function (stream) {
            var video = document.getElementById('remoteVideo');
            video.srcObject = stream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        });
        media.answer(mediastream);
    });
};

function call() {
    var media = peer.call('Answerer', mediastream);
    media.on('stream', function (stream) {
        var video = document.getElementById('remoteVideo');
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
    });
};