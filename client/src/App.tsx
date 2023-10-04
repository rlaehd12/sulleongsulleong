import React, { useState, useEffect } from 'react';
import {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
	const [desktopView, setDesktopView] = useState<boolean>(
		window.innerWidth <= 320 || window.innerHeight <= 300,
	);

	useEffect(() => {
		const handleResize = () => {
			setDesktopView(window.innerWidth <= 320 || window.innerHeight <= 300);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (desktopView) {
		return (
			<div
				style={{
					padding: '20px',
					backgroundColor: '#f8d7da',
					color: '#721c24',
					borderRadius: '5px',
				}}
			>
				<h2>화면 크기 주의</h2>
				<p>
					현재 화면이 너무 작습니다. 화면 크기를 늘려주세요. (최소 320px x
					300px)
				</p>
			</div>
		);
	}

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
