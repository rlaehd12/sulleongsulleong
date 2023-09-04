import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Button,
	Card,
	Container,
	Divider,
	TextField,
	InputAdornment,
	CardMedia,
	CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Carousel from 'react-material-ui-carousel';

import Navbar from '../components/navbar';
import style from '../styles/mainpage.module.css';

import event1 from '../images/event1.jpg';
import event2 from '../images/event2.jpg';
import event3 from '../images/event3.jpg';

interface Beer {
	image_url: string;
	id: number;
	name: string;
}

function MainPage() {
	const PER_PAGE = 10;

	const [beerList, setBeerList] = useState<Beer[]>([]);

	const url = `https://api.punkapi.com/v2/beers?page=1&per_page=${PER_PAGE}`;
	useEffect(() => {
		axios.get(url).then((res) => {
			setBeerList(res.data);
		});
	});
	return (
		<>
			<Navbar />
			<div className={style.mainPage}>
				<Container>
					<TextField
						className={style.searchBar}
						id="standard-search"
						label="어떤 술을 찾으시나요?"
						type="search"
						variant="standard"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<Carousel className={style.carousel}>
						<img className={style.carouselImg} src={event1} alt="event1" />
						<img className={style.carouselImg} src={event2} alt="event2" />
						<img className={style.carouselImg} src={event3} alt="event3" />
					</Carousel>
				</Container>
				<Divider variant="middle" />
				<Container>
					<span>가장 인기 있는 맥주</span>
					<hr className={style.titlehr} />
					<div className={style.cardContainer}>
						{beerList.map((beer) => (
							<Card className={style.card}>
								<CardMedia
									className={style.cardImg}
									component="img"
									image={beer.image_url}
									alt={beer.name}
								/>
								<CardContent className={style.cardContent}>
									<span className={style.cardTitle}>{beer.name}</span>
								</CardContent>
							</Card>
						))}
					</div>
				</Container>
				<Container className={style.surveyArea}>
					<span>술을 잘 모르시나요?</span>
					<h3>나에게 맞는 술 찾으러 가기</h3>
					<Button variant="contained">GO</Button>
				</Container>
			</div>
		</>
	);
}

export default MainPage;
