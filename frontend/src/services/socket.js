import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

let socket = null;

export const connectSocket = (userId, userName) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: {
      userId,
      userName,
    },
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export const joinRoom = (roomId) => {
  if (socket) {
    socket.emit('joinRoom', { roomId });
  }
};

export const leaveRoom = (roomId) => {
  if (socket) {
    socket.emit('leaveRoom', { roomId });
  }
};

export const sendMessage = (roomId, message) => {
  if (socket) {
    socket.emit('sendMessage', { roomId, message });
  }
};

export const startTyping = (roomId) => {
  if (socket) {
    socket.emit('userTyping', { roomId });
  }
};

export const stopTyping = (roomId) => {
  if (socket) {
    socket.emit('stopTyping', { roomId });
  }
};

export const onUserJoined = (callback) => {
  if (socket) {
    socket.on('userJoined', callback);
  }
};

export const onUserLeft = (callback) => {
  if (socket) {
    socket.on('userLeft', callback);
  }
};

export const onMessageReceived = (callback) => {
  if (socket) {
    socket.on('receiveMessage', callback);
  }
};

export const onUserTyping = (callback) => {
  if (socket) {
    socket.on('userTyping', callback);
  }
};

export const onUserStoppedTyping = (callback) => {
  if (socket) {
    socket.on('stopTyping', callback);
  }
};
