import React from 'react';
import { Button } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import logo from '../images/logo.png';
import style from '../styles/login.module.css';

function loginPage() {
	const onSuccess = async (response: any) => {
		const jwtToken = response.credential;

		const base64Url = jwtToken.split('.')[1];

		const base64 = base64Url.replace('-', '+').replace('_', '/');
		const decodedBase64 = window.atob(base64);

		const textDecoder = new TextDecoder('utf-8');
		const decodedPayloadArray = new Uint8Array(
			decodedBase64.split('').map((char: string) => char.charCodeAt(0)),
		);
		const decodedPayload = textDecoder.decode(decodedPayloadArray);

		const payload = JSON.parse(decodedPayload);
		const { name, email } = payload;

		try {
			const apiRespnose = await axios.post(
				'http://localhost:8080/api/member/login/google',
				{
					name,
					email,
				},
				{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
					},
				},
			);
			const sessionId = apiRespnose.headers.authorization;
			if (sessionId) {
				window.sessionStorage.setItem('authorization', sessionId);
			}
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

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
			<GoogleLogin onSuccess={onSuccess} />
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
