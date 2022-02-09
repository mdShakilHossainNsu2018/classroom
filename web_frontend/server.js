var app = require('express')()
var httpServer = require('http').Server(app)

const io = require("socket.io")(httpServer, {
    cors: {
        origin: ["http://localhost:8080", 'http://192.168.0.102:8080'
],
        methods: ["GET", "POST"]
    }

});

// io.origins('*:*')

// const cors = require('cors')

// app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     next();
// })

app.get('/clients', (req, res) => {
    res.send(Object.keys(io.sockets.clients().connected))
})

let roomnumber = 0;

io.on('connection', socket => {
    console.log(`A user connected with socket id ${socket.id}`)


    socket.on('join-room', (roomId, userId) => {
        console.log('join-room server')
        console.log('userId', userId)
        console.log('roomId', roomId)
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('userConnected', userId)

        socket.on('disconnect', () => {
            console.log('disconnect from express.', userId)
            socket.to(roomId).broadcast.emit('userDisconnected', userId)

        })
    })

    socket.on('createOrJoin', room => {
        console.log('create or join to room', room)

        const myRoom = io.sockets.adapter.rooms[room] || {length: 0}

        // if( myRoom ) {
        //     Object.keys(myRoom.sockets).forEach( function(socketId){
        //         console.log("sioRoom client socket Id: " + socketId );
        //     });
        // }

        const numClients = myRoom.length;
        // console.log(io.sockets.adapter.rooms[room].sockets)

        console.log(room, 'has', numClients, 'clients')

        if(roomnumber === 0 ){
            socket.join(room)
            socket.emit('created', room)
            roomnumber++
            console.log(roomnumber)
        } else if(roomnumber === 1) {
            socket.join(room)
            socket.emit('joined', room)
        } else {
            socket.emit('full', room)
        }
    })

    socket.on('ready', room =>{
        socket.broadcast.to(room).emit('ready')
    })

    socket.on('candidate', event => {
        socket.broadcast.to(event.room).emit('candidate', event)
    })

    socket.on('offer', event => {
        socket.broadcast.to(event.room).emit('offer', event.sdp)
    })

    socket.on('answer', event => {
        socket.broadcast.to(event.room).emit('answer', event.sdp)
    })



    // socket.broadcast.emit('user-connected', socket.id)

    // socket.on('disconnect', () => {
    //     socket.broadcast.emit('user-disconnected', socket.id)
    // })

    socket.on('nudge-client', data => {
        socket.broadcast.to(data.to).emit('client-nudged', data)
    })
})

httpServer.listen(3000, () => {
    console.log('Listening on *:3000')
})
