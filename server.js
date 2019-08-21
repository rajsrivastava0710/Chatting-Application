var express=require('express');

var socket=require('socket.io');

var app =express();

var server=app.listen(3000,function () {

    console.log("COnnected to the server");
});

app.use(express.static('public'));


var io=socket(server);

io.on('connection',function (socket) {

    console.log('A new User connected!');

	socket.on('join',function (data) {
        socket.broadcast.emit('join',data);

    });
    socket.on('chat',function (data) {

        io.sockets.emit('chat',data);
    });

    socket.on('typing',function (data) {

        socket.broadcast.emit('typing',data);
    });

    socket.on('disconnect',function(){
        console.log("A User disconnected")
    });
});