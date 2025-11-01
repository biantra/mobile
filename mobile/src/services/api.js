import axios from 'axios';
const API_BASE = 'http://YOUR_BACKEND_IP:4000'; // replace with backend IP or domain
export default axios.create({ baseURL: API_BASE, timeout: 10000 });
