import React from 'react';

const SignUp = () => {
	return (
		<form>
			<div className="form-row">
				<div className="col-md-4 mb-3">
					<label htmlFor="validationServerUsername">Pseudo</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="validationServerUsername"
							aria-describedby="inputGroupPrepend3"
							required
						/>
					</div>
				</div>
				<div className="form-group col-md-6">
					<label htmlFor="email">Email</label>
					<input type="email" className="form-control" id="inputEmail4" />
				</div>
				<div className="form-group col-md-6">
					<label htmlFor="password">Mot de passe</label>
					<input type="password" className="form-control" id="inputPassword4" />
				</div>
			</div>
			<button type="submit" className="btn btn-primary">
				S'inscrire
			</button>
		</form>
	);
};

export default SignUp;
