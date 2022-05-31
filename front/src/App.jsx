import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Accueil from './pages/Accueil';
import SignUp from './pages/SignUp';
import Post from './pages/Post';
import EditProfil from './pages/EditProfil';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact component={Accueil} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={SignUp} />
				<Route path="/post" component={Post} />
				<Route path="/profile" component={EditProfil} />
			</Routes>
		</Router>
	);
}

export default App;
