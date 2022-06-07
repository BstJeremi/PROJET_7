import axios from 'axios';
import React from 'react';

const Login = () => {
    const email = 'biset.jeremi@gmail.com'
    const password = '123456'

	const validate = e => {
		e.preventDefault();
		axios.post('auth/login', {
			email,
			password
		})
		.then(response => {
			console.log(response)
		})
		.catch(err => {
			alert('Mot de passe ou email incorrect !')
		})
	}

	return (
		<form>
			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					class="form-control"
					id="email"
                    name="email"
					aria-describedby="emailHelp"
					placeholder="Enter email"
				/>
			</div>
			<div class="form-group">
				<label for="pasword">Mot de passe</label>
				<input type="password" class="form-control" id="password" name="password" placeholder="Password" />
			</div>
			<button onClick={validate} type="submit" class="btn btn-primary">
				Valider
			</button>
		</form>
	);
};

export default Login;
