import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import customAxios from '../customAxios';
import style from '../styles/login.module.css';

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function GuestLoginButton({ setIsAuthenticated }: Props) {
	const navigate = useNavigate();

	const handleGuestLogin = async () => {
		try {
			const response = await customAxios().get('/login/guest');

			const authHeaderValue = response.headers.authorization;

			if (authHeaderValue) {
				sessionStorage.setItem('authorization', authHeaderValue);
			}
			setIsAuthenticated(true);
			navigate('/');
		} catch (error) {
			console.error('API 요청 중 오류 발생:', error);
		}
	};

	return (
		<Button
			className={style.loginBtn}
			variant="outlined"
			sx={{ borderWidth: '2px', fontWeight: 'bold', fontSize: '1.2rem' }}
			onClick={handleGuestLogin}
		>
			비회원으로 이용하기
		</Button>
	);
}

export default GuestLoginButton;
