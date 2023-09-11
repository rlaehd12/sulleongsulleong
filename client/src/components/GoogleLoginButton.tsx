import React from 'react';
import { Button } from '@mui/material';
import style from '../styles/login.module.css';

function GoogleLoginButton() {
	const oauthSignIn = async () => {
		try {
			const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
			const params = {
				client_id:
					'681159939854-mbkio13ft80rtf962te4vj5ni8mhgh1c.apps.googleusercontent.com',
				redirect_uri: 'http://localhost:3000/login/google',
				response_type: 'code',
				scope: 'email profile',
			};

			const formParams = new URLSearchParams(params).toString();
			const url = `${oauth2Endpoint}?${formParams}`;

			window.location.href = url;
		} catch (error) {
			console.error('API 요청 중 오류 발생:', error);
		}
	};

	return (
		<Button className={style.loginBtn} variant="outlined" onClick={oauthSignIn}>
			Sign in with Google
		</Button>
	);
}

export default GoogleLoginButton;
