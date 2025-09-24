import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "PUT"],
  }
});
io.on('connection', (socket) => {
  console.log('Socket Connected!', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User Id - ${socket.id} joined Room ${data}`);
  });

  socket.on('send_message', (data) => {
    console.log('send message', data)

    socket.to(data.chatRoom).emit('receive_message', data);
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected.', socket.id);
  });


});


app.use(cors());


server.listen(4000, () => {
  console.log('Server is running on port 400');
})