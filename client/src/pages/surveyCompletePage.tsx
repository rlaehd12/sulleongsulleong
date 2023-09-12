import React, { useEffect, useState } from 'react';
import { Button, Container, Divider } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import Navbar from '../components/navbar';
import style from '../styles/surveyComplete.module.css';

function ServeyCompPage() {
	return (
		<>
			<Navbar />
			<div className={style.mainPage}>
				<Container className={style.TaskAltcontainer}>
					<TaskAltIcon className={style.TaskAltIcon} />
				</Container>

				<Container className={style.likeSentence}>
					<span>취향 선택이 완료되었습니다 :)</span>
				</Container>

				<Container className={style.buttonArea}>
					<hr />
					<Button className={style.button} variant="contained">
						추천리스트 확인하러 가기
					</Button>
				</Container>
			</div>
		</>
	);
}

export default ServeyCompPage;
