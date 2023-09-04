import React from 'react';
import { Button } from '@mui/material';
// import { GoogleLogin } from '@react-oauth/google';
import logo from '../images/logo.png';
import style from '../styles/login.module.css';

function loginPage() {
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
			<Button className={style.loginBtn} variant="contained" color="primary">
				Google Login
			</Button>
			<hr />
			<div className={style.noLoginText}>
				<span>아직 회원이 아니신가요?</span>
			</div>
			<Button className={style.loginBtn} variant="outlined">
				비회원으로 이용하기
			</Button>
		</div>
	);
}

export default loginPage;
