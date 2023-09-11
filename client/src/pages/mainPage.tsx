import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
	Button,
	Card,
	Container,
	Divider,
	CardMedia,
	CardContent,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import Navbar from '../components/navbar';
import style from '../styles/mainpage.module.css';

import event1 from '../images/event1.jpg';
import event2 from '../images/event2.jpg';
import event3 from '../images/event3.jpg';
import BeerSearch from '../components/beerSearch';

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

function MainPage() {
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [query, setQuery] = useState<string>('');
	const navigate = useNavigate();

	// const url = `http://localhost:8080/api/main`;
	// useEffect(() => {
	// 	axios.get(url).then((res) => {
	// 		setBeerList(res.data);
	// 	});
	// }, []);

	return (
		<>
			<Navbar />
			<div className={style.mainPage}>
				<Container>
					<BeerSearch />
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
									image={beer.image}
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
					<Link to="/survey">
						<Button variant="contained">GO</Button>
					</Link>
				</Container>
			</div>
		</>
	);
}

export default MainPage;
