import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function SignUp() {
	const [ pseudo, setPseudo ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const navigate = useNavigate();

	const signup = (e) => {
		e.preventDefault();
		Axios({
			method: 'post',
			url: 'user/signup',
			data: {
				pseudo: pseudo,
				email: email,
				password: password
			}
		})
			.then(({ data }) => {
				alert(data.message);
				navigate('/');
			})
			.catch((error) => {
				alert('Une erreur est survenue');
			});
	};

	return (
		<form onSubmit={signup} style={{color: 'white'}}>
			<div className="form-row">
				<div className="form-group" style={{marginBottom: 10, marginTop: 20}}>
					<label htmlFor="validationServerUsername">Pseudo</label>
						<input
							type="text"
							className="form-control"
							id="validationServerUsername"
							aria-describedby="inputGroupPrepend3"
							required
							onInput={(e) => setPseudo(e.target.value)}
						/>
				</div>
				<div className="form-group" style={{marginBottom: 10}}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="form-control"
						id="inputEmail4"
						onInput={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group" style={{marginBottom: 10}}>
					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						className="form-control"
						id="inputPassword4"
						onInput={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>
			<button type="submit" className="btn btn-primary" style={{backgroundColor: "#FD2D01", borderColor: "#FD2D01"}}>
				S'inscrire
			</button>
		</form>
	);
}

export default SignUp;
