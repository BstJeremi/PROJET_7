import { NavLink } from "react-router-dom";
import img from "../images/icon-left-font-monochrome-black.png"

export default function Header() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ height: 60 }}>
			<div className="container-fluid">
				<div className="navbar-brand" href="#">
					<img className="Logo_Header" style={{ width: 150 }} src={img} alt="Logo"/>
				</div>
				<div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: "flex-end" }}>
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link active" aria-current="page" to="/">
                                Accueil
                            </NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/login">
								Se connecter
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/signup">
								S'inscrire
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/post" tabIndex="-1" aria-disabled="true">
								Créer un post 
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
