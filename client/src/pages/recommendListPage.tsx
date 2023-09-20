import React, { useEffect, useState } from 'react';
import { Container, TextField } from '@mui/material';

import Navbar from '../components/navbar';
import style from '../styles/recommendListPage.module.css';
import TabBar from '../components/tabBar';
import InfiniteScroll from '../components/InfiniteScroll';

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecommendListPage({ setIsAuthenticated }: Props) {
	return (
		<>
			<Navbar />
			<div className={style.recommendPage}>
				<Container sx={{ marginBottom: '30px' }}>
					<TextField
						className={style.textField}
						id="standard-read-only-input"
						defaultValue="사용자님의 취향에 맞는 술을 찾아보았어요"
						InputProps={{
							readOnly: true,
							className: style.input,
						}}
						variant="standard"
					/>
				</Container>
				<Container className={style.beerList}>
					<hr />
					<div className={style.cardContainer}>
						<InfiniteScroll
							url="https://api.punkapi.com/v2/beers"
							PER_PAGE={10}
						/>
					</div>
				</Container>
			</div>
			<TabBar />
		</>
	);
}

export default RecommendListPage;
