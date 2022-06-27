import Axios from 'axios';
import { useState } from 'react';

function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const validate = (e) => {

		e.preventDefault();
		Axios({
			method: 'post',
			url: 'http://localhost:4000/api/user/login',
			data: {
				email: email,
				password: password
			}
		})
			.then((res) => {
				console.log(res);
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
					onInput={e => setEmail(e.target.value)}
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
					onInput={e => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit" className="btn btn-primary" href="/" style={{ marginTop: 20 }}>
				Valider
			</button>
		</form>
	);
}

export default Login;
