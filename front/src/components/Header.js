import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import img from '../images/icon-left-font-monochrome-black.png';
import './Header.css';
// import jwtDecode from 'jwt-decode';

export default function Header() {
	const { appContext, setAppContext } = useContext(AppContext);
	const navigate = useNavigate();

	// useEffect(() => {
	// const token = localStorage.getItem('token');
	// const decoded = jwtDecode(token);
	// console.log(decoded);
	// });

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<div className="navbar-brand" href="#">
					<img className="Logo_Header" style={{ width: 150 }} src={img} alt="Logo" />
				</div>
				<div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end' }}>
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link active" aria-current="page" to="/">
								Accueil
							</NavLink>
						</li>
						<li className="nav-item">
							{!appContext.isConnected ? (
								<NavLink className="nav-link" to="/login">
									Se connecter
								</NavLink>
							) : (
								<a
									href=""
									className="nav-link"
									onClick={(e) => {
										e.preventDefault();
										setAppContext({
											isConnected: false
										});
										localStorage.removeItem('token');
										navigate('/');
									}}
								>
									Déconnexion
								</a>
							)}
						</li>
						<li className="nav-item">
							{!appContext.isConnected && (
								<NavLink className="nav-link" to="/signup">
									S'inscrire
								</NavLink>
							)}
						</li>
						<li className="nav-item">
							{appContext.isConnected && (
								<NavLink className="nav-link" to="/post" tabIndex="-1" aria-disabled="true">
									Créer un post
								</NavLink>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
