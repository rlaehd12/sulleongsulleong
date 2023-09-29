import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Chip } from '@mui/material';
import DounutChart from 'react-donut-chart';
import customAxios from '../customAxios';
import style from '../styles/dictPage.module.css';

interface beer {
	beer_id: number;
	image: string;
	largeCategory: string;
	dictCheck: boolean;
	name: string;
}

interface beerList {
	beers: beer[];
	beerCount: number;
}

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function DictPage({ setIsAuthenticated }: Props) {
	const axiosInstance = customAxios();
	const [beerCards, setBeerCards] = React.useState<beerList>();
	useEffect(() => {
		axiosInstance
			.get('/dict')
			.then((res) => {
				setBeerCards(res.data);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Container>
			<h2>내 맥주도감</h2>
			<hr className={style.divider} />
			<Grid container spacing={2}>
				<Grid item xs={6} className={style.title}>
					<p>진척도</p>
					<span>
						{beerCards?.beerCount} / {beerCards?.beers.length}
					</span>
				</Grid>
				<Grid item xs={6}>
					<DounutChart
						data={[
							{
								label: '안 마신 맥주',
								value:
									(beerCards?.beers.length ?? 0) - (beerCards?.beerCount ?? 0),
							},
							{ label: '내가 마신 맥주', value: beerCards?.beerCount ?? 0 },
						]}
						colors={['#a0a0a0ff', '#7ed957']}
						interactive={false}
						width={100}
						height={100}
						legend={false}
						strokeColor="none"
					/>
				</Grid>
			</Grid>
			<hr className={style.divider} />
			<Container className={style.cardList}>
				<Grid container spacing={2}>
					{beerCards?.beers.map((b) => (
						<Grid item xs={4}>
							<Link to={`/detail/${b.beer_id}`} className={style.card}>
								<img
									className={`${style.beerImg} ${
										b.dictCheck ? '' : style.grayScale
									}`}
									src={b.image}
									alt="beer"
								/>
								<Chip label={b.largeCategory} />
								<br />
								<span>{b.name}</span>
							</Link>
						</Grid>
					))}
				</Grid>
			</Container>
		</Container>
	);
}

export default DictPage;
