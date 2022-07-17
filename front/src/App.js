import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Accueil from './pages/Accueil/Accueil';
import SignUp from './pages/Inscrire/SignUp';
import NotFound from './pages/Notfound/NotFound';
import Header from './components/Header';
import React, { useState } from 'react';
import { AppContext } from './AppContext';
import NewPost from './pages/Posts/NewPost';

function App() {
	const [ appContext, setAppContext ] = useState({ isConnected: localStorage.getItem('token') != null });

	return (
		<AppContext.Provider
			value={{
				appContext: appContext,
				setAppContext: setAppContext
			}}
		>
			<Router>
				<Header />
				<div className="container">
					<Routes>
						<Route path="/" element={<Accueil />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/post" element={<NewPost />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
