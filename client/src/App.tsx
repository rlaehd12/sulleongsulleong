import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	BrowserRouter,
	useNavigate,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import TabBar from './components/tabBar';
import LoginPage from './pages/loginPage';
import GoogleRedirectHandler from './pages/GoogleRedirectHandler';
import MainPage from './pages/mainPage';
import RecommendListPage from './pages/recommendListPage';
import SurveyPage from './pages/surveyPage';
import SurveyCompPage from './pages/surveyCompletePage';
import SearchResultPage from './pages/searchResultPage';
import MyPage from './pages/myPage';
import DetailPage from './pages/beerDetailPage';
import DictPage from './pages/dictPage';

interface AuthRedirectorProps {
	isAuthenticated: boolean;
}
function AuthRedirector({ isAuthenticated }: AuthRedirectorProps) {
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	return null;
}

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	return (
		<BrowserRouter>
			<AuthRedirector isAuthenticated={isAuthenticated} />
			<div className="routes-content">
				<Routes>
					<Route
						path="/login/*"
						element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
					/>
					<Route
						path="/login/google"
						element={
							<GoogleRedirectHandler setIsAuthenticated={setIsAuthenticated} />
						}
					/>
					<Route
						element={
							<>
								<Navbar /> <TabBar />
							</>
						}
					>
						<Route
							path="/recommendList"
							element={
								<RecommendListPage setIsAuthenticated={setIsAuthenticated} />
							}
						/>
						<Route
							path="/survey"
							element={<SurveyPage setIsAuthenticated={setIsAuthenticated} />}
						/>
						<Route
							path="/surveyComp"
							element={
								<SurveyCompPage setIsAuthenticated={setIsAuthenticated} />
							}
						/>
						<Route
							path="/searchresult"
							element={
								<SearchResultPage setIsAuthenticated={setIsAuthenticated} />
							}
						/>
						<Route
							path="/myPage"
							element={<MyPage setIsAuthenticated={setIsAuthenticated} />}
						/>
						<Route
							path="/detail/:beerId"
							element={<DetailPage setIsAuthenticated={setIsAuthenticated} />}
						/>
						<Route
							path="/dict"
							element={<DictPage setIsAuthenticated={setIsAuthenticated} />}
						/>
						<Route
							path="/"
							element={<MainPage setIsAuthenticated={setIsAuthenticated} />}
						/>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
