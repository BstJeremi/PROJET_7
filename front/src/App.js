import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Accueil from './pages/Accueil';
import SignUp from './pages/SignUp';
import Post from './pages/Post';
import EditProfil from './pages/EditProfil';
import Header from './components/Header'

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
				<Route path="/profil" element={<EditProfil/>} />
			</Routes>
			</div>
		</Router>
	);
}

export default App;
