import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import RecommendListPage from './pages/recommendListPage';
import SurveyPage from './pages/surveyPage';
import SurveyCompPage from './pages/surveyCompletePage';
import SearchResultPage from './pages/searchResultPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/recommendList" element={<RecommendListPage />} />
				<Route path="/survey" element={<SurveyPage />} />
				<Route path="/surveyComp" element={<SurveyCompPage />} />
				<Route path="/searchresult" element={<SearchResultPage />} />
				<Route path="/" element={<MainPage />} />
			</Routes>
		</Router>
	);
}

export default App;
