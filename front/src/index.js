import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import './index.css';

axios.defaults.baseURL = 'http://localhost:4000/api/';
axios.interceptors.request.use(
	(config) => {
		config.headers = { 'X-auth-token': localStorage.getItem('token') };
		return config;
	},
	(error) => Promise.reject(error)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
