import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import RecommendListPage from './pages/recommendListPage';
import ServeyCompPage from './pages/serveyCompletePage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/" element={<MainPage />} />
				<Route path="/recommendList" element={<RecommendListPage />} />
				<Route path="/serveyComp" element={<ServeyCompPage />} />
			</Routes>
		</Router>
	);
}

export default App;
