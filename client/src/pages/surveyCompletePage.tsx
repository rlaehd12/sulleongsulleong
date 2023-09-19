import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import sudalImg from '../images/sudal.png';
import style from '../styles/surveyComplete.module.css';

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function ServeyCompPage({ setIsAuthenticated }: Props) {
	const navigate = useNavigate();
	return (
		<div className={style.mainPage}>
			<Container className={style.TaskAltcontainer}>
				<img src={sudalImg} alt="sudal" className={style.sudalImg} />
			</Container>

			<Container className={style.likeSentence}>
				<span>취향 선택이 완료되었습니다 😋</span>
			</Container>

			<Container className={style.buttonArea}>
				<hr className={style.divider} />
				<Button
					className={style.button}
					variant="contained"
					onClick={() => navigate('/recommendList')}
				>
					추천리스트 확인하러 가기
				</Button>
			</Container>
		</div>
	);
}

export default ServeyCompPage;
