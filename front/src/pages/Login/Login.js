import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { setAppContext } = useContext(AppContext);
	const navigate = useNavigate();

	const validate = (e) => {
		e.preventDefault();
		axios({
			method: 'post',
			url: 'user/login',
			data: {
				email: email,
				password: password
			}
		})
			.then(({ data }) => {
				localStorage.setItem('token', data.token);
				setAppContext({
					isConnected: true
				});
				navigate('/');
			})
			.catch((err) => {
				alert('Mot de passe ou email incorrect !');
			});
	};

	return (
		<form onSubmit={validate} className="login" style={{ marginTop: 50 }}>
			<div className="form-group" style={{ marginTop: 10 }}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					className="form-control"
					id="email"
					name="email"
					aria-describedby="emailHelp"
					placeholder="Enter email"
					onInput={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-group" style={{ marginTop: 10 }}>
				<label htmlFor="pasword">Mot de passe</label>
				<input
					type="password"
					className="form-control"
					id="password"
					name="password"
					placeholder="Password"
					onInput={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit" className="btn btn-primary" href="/" style={{ marginTop: 20 }}>
				Valider
			</button>
		</form>
	);
}

export default Login;
