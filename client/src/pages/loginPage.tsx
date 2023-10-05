import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';
import GuestLoginButton from '../components/GuestLoginButton';
import logo from '../images/logo_kr.png';
import style from '../styles/login.module.css';

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginPage({ setIsAuthenticated }: Props) {
	return (
		<div className={style.loginContainer}>
			<img className={style.loginLogo} src={logo} alt="Logo" />

			<div className={style.loginText}>
				<span>
					로그인하고
					<br />
					나를 위한 맥주 추천 받기
				</span>
			</div>

			<Routes>
				<Route path="/" element={<GoogleLoginButton />} />
			</Routes>

			<hr />
			<div className={style.noLoginText}>
				<span>아직 회원이 아니신가요?</span>
			</div>
			<GuestLoginButton setIsAuthenticated={setIsAuthenticated} />
		</div>
	);
}

export default LoginPage;
