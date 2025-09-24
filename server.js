import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-application-frontend-react-js.vercel.app",
    methods: ["GET", "PUT"],
  }
});
io.on('connection', (socket) => {
  //console.log('Socket Connected!', socket.id);

  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    // console.log(`User Id - ${socket.id} joined Room ${roomName}`);
  });

  socket.on('send_message', (data) => {
    console.log('send message', data);
    // Emit to everyone in room including sender
    io.in(data.chatRoom).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    //console.log('Socket disconnected.', socket.id);
  });
});

app.use(cors());


server.listen(4000, () => {
  //console.log('Server is running on port 400');
})