const express = require('express');
const { Server } = require("socket.io");
const http = require("http");
require('dotenv').config()
const PORT = process.env.PORT;
const { createAdapter } = require("@socket.io/redis-adapter");
const Redis = require("ioredis");

const app = express();
const httpServer = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pubClient = new Redis("rediss://default:be41be659f174cf287978f6e72a15e75@intense-doberman-38397.upstash.io:38397");
const subClient = pubClient.duplicate();

const re = new RegExp("(^|^[^:]+:\/\/|[^\.]+\.)cpypst\.online");
const origins=[re,"http://localhost:3001","http://feniln64.localhost:3001"]
const io = new Server(httpServer, {
    cors: {
      origin: origins,
      methods: ["*"],
    }
  });

io.adapter(createAdapter(pubClient, subClient));

io.on('connection', (socket) => {
  console.info(`Admin Client connected [id=${socket.id}]`);

  socket.on('join_room',room=>{                 // client will emmit message asking to join room
    socket.join(room)       
    console.log(room)                      // server join the room by creating it
    console.log("room joined : ",room)
  })
  // send message to room
  socket.on('updatecontent',(data)=>{                        // clinet send message with room and data
    socket.to(data.room).emit('message',data.message)   
    console.log(data)  // server sends message to that particular room 
    console.log("message sent from room : ",data)
  })

  socket.on('newcontent', (data) => {
    console.log('newcontent socket called');
    socket.to(data.room).emit('newcontent',data.message);
  });

  socket.on('deletecontent', (data) => {
    console.log('deletecontent socket called');
    socket.to(data.room).emit('deletecontent',"delete");
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});