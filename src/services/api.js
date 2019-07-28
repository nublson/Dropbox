import axios from 'axios';

const api = axios.create({
	baseURL: 'https://dropboxclonethenletter.herokuapp.com'
});

export default api;
