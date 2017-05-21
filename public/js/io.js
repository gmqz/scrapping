(function() {
    console.log('socket.io starting...');
    var _socket = io(),
        total = 0, geo = 0;
    console.log('socket.io connecting...');
    _socket.on('connect', function () {
        console.log('socket.io connect success...');
        _socket.emit('getDataBroadcasting', '', function (data) {
            console.log(data);
        });
        _socket.on('broadcasting', function (data) {
            console.log(data);
        });
    });
})();
