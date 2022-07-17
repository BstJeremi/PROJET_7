import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
	const Navigate = useNavigate();

	return (
		<div>
			<h1>La page demandé n'existe pas </h1>
			<button onClick={() => Navigate('/')}> Retourner à l'Accueil </button>
		</div>
	);
}
