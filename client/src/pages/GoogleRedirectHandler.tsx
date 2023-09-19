import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import customAxios from '../customAxios';

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
function GoogleRedirectHandler({ setIsAuthenticated }: Props) {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const code = urlParams.get('code');

		if (code) {
			customAxios()
				.post('/oauth/login/google', { code })
				.then((response) => {
					const authHeader = response.headers.authorization;
					if (authHeader) {
						sessionStorage.setItem('authorization', authHeader);
						setIsAuthenticated(true);
						navigate('/');
					} else {
						console.error('Authorization header is missing in the response.');
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [location, navigate]);

	return <div>Google Login Redirect...</div>;
}

export default GoogleRedirectHandler;
