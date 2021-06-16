const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = 3000;

const WELCOME_MSG = { message: '🌚 Welcome aboard' };

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/**
 * Socket events
 * @param socket
 */
io.on('connection', (socket) => {
  console.log('👩‍ a user connected');
  // Broadcast an event to all users
  io.emit('event', WELCOME_MSG.message);

  socket.broadcast.emit(WELCOME_MSG.message);

  // Emit events
  socket.on('chat message', (msg) => {
    console.log('message: ', msg);
    io.emit('chat message', msg);
  });

  // disconnect on page refresh/reload
  socket.on('disconnect', () => {
    console.log('🚨 user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚧 Listening on port ${PORT}`);
});
