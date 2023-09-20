import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';
import customAxios from '../customAxios';
import style from '../styles/mypage.module.css';

interface Info {
	age: number;
	gender: string;
}
interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyPage({ setIsAuthenticated }: Props) {
	const axiosInstance = customAxios();
	const [MemberInfo, setMemberInfo] = useState<Info>({} as Info);

	useEffect(() => {
		axiosInstance
			.get('/members/info')
			.then((res) => {
				setMemberInfo(res.data);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setIsAuthenticated(true);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const navigate = useNavigate();
	const handleLogout = () => {
		axiosInstance.post('/logout');
		sessionStorage.removeItem('authorization');
		navigate('/login');
	};

	return (
		<div className={style.myPage}>
			<Container className={style.myPageContainer}>
				<span className={style.title}>마이페이지</span>
				<hr className={style.titleDivider} />

				<div className={style.infoContainer}>
					<TextField
						className={style.infoText}
						label="성별"
						color="primary"
						variant="filled"
						value={MemberInfo.gender === 'M' ? '남성' : '여성'}
						InputProps={{
							readOnly: true,
						}}
						focused
					/>
					<TextField
						className={style.infoText}
						label="연령대"
						color="primary"
						variant="filled"
						value={`${MemberInfo.age}대`}
						InputProps={{
							readOnly: true,
						}}
						focused
					/>
				</div>
			</Container>
			<Button
				className={style.logoutBtn}
				variant="outlined"
				color="primary"
				sx={{
					width: '80%',
					borderWidth: '2px',
					fontWeight: 'bold',
					fontSize: '1.2rem',
				}}
				onClick={handleLogout}
			>
				로그아웃
			</Button>
		</div>
	);
}

export default MyPage;
