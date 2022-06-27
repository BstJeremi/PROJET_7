import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Accueil from './pages/Accueil/Accueil';
import SignUp from './pages/Inscrire/SignUp';
import Post from './pages/Posts/Post';
import EditProfil from './pages/Profils/EditProfil';
import NotFound from './pages/Notfound/NotFound'
import Header from './components/Header'
import React from 'react'

function App() {
	return (
		<Router>
		<Header/>
			<div className="container">
			<Routes>
				<Route path="/" element={<Accueil/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/signup" element={<SignUp/>} />
				<Route path="/post" element={<Post/>} />
				<Route path="/profil/:id" element={<EditProfil/>} />
				<Route path="*" element={<NotFound/>} />
			</Routes>
			</div>
		</Router>
	);
}

export default App;
