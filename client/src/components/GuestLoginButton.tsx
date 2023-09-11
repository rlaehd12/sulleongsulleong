import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../styles/login.module.css';

function GuestLoginButton() {
	const navigate = useNavigate();

	const handleGuestLogin = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/login/guest');

			const authHeaderValue = response.headers.authorization;
			if (authHeaderValue) {
				sessionStorage.setItem('authorization', authHeaderValue);
			}

			navigate('/');
		} catch (error) {
			console.error('API 요청 중 오류 발생:', error);
		}
	};

	return (
		<Button
			className={style.loginBtn}
			variant="outlined"
			onClick={handleGuestLogin}
		>
			비회원으로 이용하기
		</Button>
	);
}

export default GuestLoginButton;
