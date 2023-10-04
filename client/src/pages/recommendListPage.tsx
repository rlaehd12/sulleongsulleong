import React, { useEffect, useState } from 'react';
import { Container, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import TabBar from '../components/tabBar';
import BeerCard from '../components/beerCard';
import LoginModal from '../components/loginModal';

import customAxios from '../customAxios';
import style from '../styles/recommendListPage.module.css';

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
	prefer: boolean;
	preferCount: number;
}
interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecommendListPage({ setIsAuthenticated }: Props) {
	const axiosInstance = customAxios();
	const navigate = useNavigate();
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [openModal, setOpenModal] = useState<boolean>(false);

	useEffect(() => {
		axiosInstance
			.get('/beers/recommend/rank')
			.then((res) => {
				setBeerList((prevBeers) => [...prevBeers, ...res.data.entries]);
			})
			.catch((err) => {
				console.error('Axios Error:', err.response.status);
				if (err.response.status === 401) {
					setIsAuthenticated(false);
				} else if (err.response.status === 400) {
					alert(
						'아직 설문조사를 진행하지 않았습니다! 설문조사 페이지로 이동합니다',
					);
					navigate('/survey');
				}
			});
	}, []);

	const clickPrefer = (targerBeerId: number) => {
		customAxios()
			.post(`/beers/preference/${targerBeerId}`)
			.then((res) => {
				const updateBeerList = [...beerList];
				updateBeerList[res.data.memberId].prefer = res.data.result;
				updateBeerList[res.data.memberId].preferCount = res.data.like;

				setBeerList(updateBeerList);
			})
			.catch((err) => {
				console.error('Error sending the request:', err);
				if (err.response.status === 401) {
					setOpenModal(true);
					console.log(openModal);
				}
			});
	};

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
						{beerList.map((beer) => {
							return (
								<div className={style.beerList}>
									<BeerCard
										key={beer.id}
										beer={beer}
										clickPrefer={clickPrefer}
									/>
								</div>
							);
						})}
					</div>
					{openModal && (
						<LoginModal openModal={openModal} setOpenModal={setOpenModal} />
					)}
				</Container>
			</div>
			<TabBar />
		</>
	);
}

export default RecommendListPage;
