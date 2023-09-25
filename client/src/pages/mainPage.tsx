import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Divider } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Recommend from '@mui/icons-material/Recommend';
import customAxios from '../customAxios';
import InfiniteScroll from '../components/InfiniteScroll';

import style from '../styles/mainpage.module.css';

import event1 from '../images/event1.jpg';
import event2 from '../images/event2.jpg';
import event3 from '../images/event3.jpg';
import beerIcon from '../images/beer.png';

interface Beer {
	id: number;
	image: string;
	name: string;
}
interface Entry {
	category: string;
	recommenBeers: Beer[];
}
interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function MainPage({ setIsAuthenticated }: Props) {
	const axiosInstance = customAxios();
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [categoryList, setcategoryList] = useState<Entry[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		axiosInstance
			.get('/beers/recommend/main')
			.then((res) => {
				console.log(res.data);
				setBeerList(res.data.todayBeers);
			})
			.catch((err) => {
				console.error('Axios Error:', err.response.status);
				if (err.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
	}, []);

	const loadCategoryList = async () => {
		if (categoryList.length > 0) return;

		setLoading(true);
		try {
			const response = await axiosInstance.get('/beers/recommend/category');
			console.log(`카테고리 리스트: ${response.data}`);
			setcategoryList(response.data.entries);
		} catch (error) {
			// 요청이 실패할 경우에 대한 에러 핸들링도 추가할 수 있습니다.
			console.error('Error fetching category list:', error);
		} finally {
			setLoading(false);
		}
	};

	// const url = `http://localhost:8080/api/main`;
	// useEffect(() => {
	// 	axios.get(url).then((res) => {
	// 		setBeerList(res.data);
	// 	});
	// }, []);

	return (
		<div className={style.mainPage}>
			<Container>
				<Carousel className={style.carousel}>
					<img className={style.carouselImg} src={event1} alt="event1" />
					<img className={style.carouselImg} src={event2} alt="event2" />
					<img className={style.carouselImg} src={event3} alt="event3" />
				</Carousel>
			</Container>
			<Divider variant="middle" />
			<Container>
				<span>오늘의 맞춤 맥주</span>
				<hr className={style.titlehr} />
				<div className={style.cardContainer}>
					{beerList.map((beer) => (
						<div key={beer.id} className={style.card}>
							<div className={style.imgContainer}>
								<img
									className={style.beerImg}
									src={beer.image || beerIcon}
									onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
										const target = e.target as HTMLImageElement;
										target.src = beerIcon; // 이미지 로드에 실패하면 beerIcon으로 대체
									}}
									alt=""
								/>
							</div>
							<div className={style.beerName}>{beer.name}</div>
						</div>
					))}
				</div>
			</Container>
			<Container className={style.surveyArea}>
				<span>술을 잘 모르시나요?</span>
				<h3>나에게 맞는 술 찾으러 가기</h3>
				<Button
					variant="contained"
					onClick={() => {
						navigate('/survey');
					}}
				>
					GO
				</Button>
			</Container>
			<Container>
				<InfiniteScroll
					Component="simpleBeerCard"
					loadMore={loadCategoryList}
					list={categoryList}
					loading={loading}
				/>
			</Container>
		</div>
	);
}

export default MainPage;
