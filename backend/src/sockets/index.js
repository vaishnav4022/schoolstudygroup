import { Server } from 'socket.io';
import config from '../config/index.js';
import Message from '../models/Message.js';

const activeSessions = new Map();

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: config.socketCorsOrigin,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    socket.on('joinRoom', ({ roomId, userName }) => {
      socket.join(roomId);
      if (!activeSessions.has(roomId)) {
        activeSessions.set(roomId, new Set());
      }
      activeSessions.get(roomId).add({ userId, socketId: socket.id, userName });

      io.to(roomId).emit('userJoined', {
        userId,
        userName,
        activeUsers: Array.from(activeSessions.get(roomId)),
      });
    });

    socket.on('leaveRoom', ({ roomId }) => {
      socket.leave(roomId);
      if (activeSessions.has(roomId)) {
        activeSessions.get(roomId).forEach((user) => {
          if (user.socketId === socket.id) {
            activeSessions.get(roomId).delete(user);
          }
        });
        io.to(roomId).emit('userLeft', {
          userId,
          activeUsers: Array.from(activeSessions.get(roomId)),
        });
      }
    });

    socket.on('sendMessage', async ({ roomId, message, sender, senderName }) => {
      const msg = {
        sender,
        group: roomId,
        message,
        timestamp: new Date(),
      };

      try {
        await Message.create(msg);
        io.to(roomId).emit('receiveMessage', { ...msg, senderName });
      } catch (error) {
        socket.emit('error', { message: 'Failed to save message' });
      }
    });

    socket.on('userTyping', ({ roomId, userName }) => {
      socket.to(roomId).emit('userTyping', { userName });
    });

    socket.on('stopTyping', ({ roomId }) => {
      socket.to(roomId).emit('stopTyping', {});
    });

    socket.on('disconnect', () => {
      activeSessions.forEach((users, roomId) => {
        let userToRemove = null;
        users.forEach((user) => {
          if (user.socketId === socket.id) {
            userToRemove = user;
          }
        });
        if (userToRemove) {
          users.delete(userToRemove);
          io.to(roomId).emit('userLeft', {
            userId: userToRemove.userId,
            activeUsers: Array.from(users),
          });
        }
      });
    });
  });

  return io;
};

export default socketServer;
