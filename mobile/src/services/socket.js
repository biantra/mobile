import io from 'socket.io-client';
const SOCKET_URL = 'http://YOUR_BACKEND_IP:4000'; // replace
const socket = io(SOCKET_URL, { transports: ['websocket'], autoConnect: true });
export default socket;
