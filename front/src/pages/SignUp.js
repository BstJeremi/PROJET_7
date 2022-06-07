import React from 'react';

const SignUp = () => {
	return (
		<form>
			<div className="form-row">
				<div className="col-md-4 mb-3">
					<label for="validationServerUsername">Username</label>
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
					<label for="email">Email</label>
					<input type="email" className="form-control" id="inputEmail4" />
				</div>
				<div className="form-group col-md-6">
					<label for="password">Mot de passe</label>
					<input type="password" className="form-control" id="inputPassword4" />
				</div>
			</div>
			<div className="form-group">
				<label for="inputAddress">Adresse</label>
				<input type="text" className="form-control" id="inputAddress" />
			</div>
			<div class="form-group">
				<label for="inputAddress2">Complément d'adresse</label>
				<input type="text" className="form-control" id="inputAddress2" />
			</div>
			<div class="form-row">
				<div className="form-group col-md-6">
					<label for="inputCity">Ville</label>
					<input type="text" className="form-control" id="inputCity" />
				</div>
				<div className="form-group col-md-4">
					<label for="inputState">Pays</label>
					<select id="inputState" className="form-control">
						<option selected>Choix</option>
						<option>France</option>
						<option>Belgique</option>
						<option>Canada</option>
						<option>Autres</option>
					</select>
				</div>
			</div>
			<button type="submit" className="btn btn-primary">
				S'inscrire
			</button>
		</form>
	);
};

export default SignUp;
