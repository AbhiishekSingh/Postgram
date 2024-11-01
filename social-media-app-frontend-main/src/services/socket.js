import { getCookie } from './cookieManager';

const io = require('socket.io-client');

export let socket = null;

export function connectToSocket(accessToken) {
  if (!socket) {
    socket = io('https://localhost:5000.com/', {
      extraHeaders: {
        token: accessToken ? accessToken : getCookie(),
      },
    });

    socket.on('connect', () => {
      console.log('Connected to Socket Server');
    });

    socket.on('connect_error', (error) => {
      if (socket.active) {
        console.log('connected');
      } else {
        console.log(error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket Server');
    });
  }
}

export function disconnectFromSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
