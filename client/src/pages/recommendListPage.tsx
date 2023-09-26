import React, { useEffect, useState } from 'react';
import { Container, TextField } from '@mui/material';

import { AxiosError } from 'axios';
import Navbar from '../components/navbar';
import style from '../styles/recommendListPage.module.css';
import TabBar from '../components/tabBar';
import InfiniteScroll from '../components/InfiniteScroll';
import customAxios from '../customAxios';

interface Beer {
	id: number;
	image: string;
	name: string;
	nameKor: string;
	abv: number;
	largeCategory: string;
	subCategory: string;
	country: string;
	score: number;
}
interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecommendListPage({ setIsAuthenticated }: Props) {
	const [page, setPage] = useState<number>(0);
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const loadBeerList = async () => {
		try {
			setLoading(true);
			const res = await customAxios().get(
				`/beers/recommend/rank?page=${page + 1}&size=10`,
			);
			if (Array.isArray(res.data.entries) && res.data.entries.length > 0) {
				setPage((prevPage) => prevPage + 1);
				setBeerList((prevBeers) => [...prevBeers, ...res.data.entries]);
			}
		} catch (err) {
			// 요청이 실패할 경우에 대한 에러 핸들링도 추가할 수 있습니다.
			console.error('Error fetching search beer list:', err);
			if ((err as AxiosError).response?.status === 401) {
				setIsAuthenticated(false);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (page === 0) return;
		loadBeerList();
	}, [page]);

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
							Component="beerCard"
							loadMore={loadBeerList}
							list={beerList}
							loading={loading}
						/>
					</div>
				</Container>
			</div>
			<TabBar />
		</>
	);
}

export default RecommendListPage;
