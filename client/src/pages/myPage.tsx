import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import customAxios from '../customAxios';
import TabBar from '../components/tabBar';
import Navbar from '../components/navbar';
import style from '../styles/mypage.module.css';

interface Info {
	age: number;
	gender: string;
}

function MyPage() {
	const axiosInstance = customAxios();
	const [MemberInfo, setMemberInfo] = useState<Info>({} as Info);

	useEffect(() => {
		axiosInstance.get('/members/info').then((res) => {
			console.log(res);
			setMemberInfo(res.data);
		});
	}, []);

	const navigate = useNavigate();
	const handleLogout = () => {
		axiosInstance.post('/api/logout');
		sessionStorage.removeItem('authorization');
		navigate('/login');
	};

	return (
		<div>
			<Navbar />
			<div className={style.myPageContainer}>
				<h1>마이페이지</h1>

				<div className={style.infoContainer}>
					<div className={style.info}>
						<span>나이</span>
						<span>{MemberInfo.age}</span>
					</div>
					<div className={style.info}>
						<span>성별</span>
						<span>{MemberInfo.gender}</span>
					</div>
				</div>
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
			<TabBar />
		</div>
	);
}

export default MyPage;
