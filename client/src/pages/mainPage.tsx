import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Divider } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
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
	recommendBeers: Beer[];
}
interface MainRecommend {
	todayBeers: Beer[];
	popularBeers: Beer[];
	similarPeoplesBeers: Beer[];
}
interface User {
	name: string;
	age: number;
	gender: string;
}
interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function MainPage({ setIsAuthenticated }: Props) {
	const axiosInstance = customAxios();
	const navigate = useNavigate();
	const [mainRecommendList, setMainRecommendList] = useState<MainRecommend>({
		todayBeers: [],
		popularBeers: [],
		similarPeoplesBeers: [],
	});
	const [userInfo, setUserInfo] = useState<User>({
		name: '',
		age: 0,
		gender: '',
	});
	const [categoryList, setcategoryList] = useState<Entry[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadCategory, setLoadCategory] = useState<number>(0);

	useEffect(() => {
		axiosInstance
			.get('/members/info')
			.then((res) => {
				const updateUserInfo = { ...userInfo };
				updateUserInfo.gender = res.data.gender;
				updateUserInfo.age = res.data.age;
				setUserInfo(updateUserInfo);
			})
			.catch((err) => {
				console.error('Axios Error:', err.response.status);
			});

		axiosInstance
			.get('/beers/recommend/main')
			.then((res) => {
				console.log(res.data);
				const { memberName, ...lists } = res.data;
				setMainRecommendList(lists);

				const updateUserInfo = { ...userInfo };
				updateUserInfo.name = memberName;
				setUserInfo(updateUserInfo);
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
			setcategoryList(response.data.entries);
		} catch (error) {
			console.error('Error fetching category list:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategoryList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadCategory]);

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
				{Object.keys(mainRecommendList).map((key) => {
					const recommendKey = key as keyof MainRecommend;
					let disc;
					switch (key) {
						case 'todayBeers':
							disc = <span>{userInfo.name}님, 오늘은 이런 맥주 어떤가요?</span>;
							break;
						case 'popularBeers':
							disc = <span>많은 분들이 좋아해요</span>;
							break;
						case 'similarPeoplesBeers':
							disc = (
								<span>
									{userInfo.age}대 {userInfo.gender}분들이 좋아해요
								</span>
							);
							break;
						default:
							disc = null;
							break;
					}

					return (
						<div>
							{disc}
							<hr className={style.titlehr} />
							<div className={style.cardContainer}>
								{mainRecommendList[recommendKey].map((beer: Beer) => {
									return (
										<div key={beer.id} className={style.card}>
											<div
												className={style.imgContainer}
												role="button"
												tabIndex={0}
												onClick={() => {
													navigate(`/detail/${beer.id}`);
												}}
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
														navigate(`/detail/${beer.id}`);
													}
												}}
											>
												<img
													className={style.beerImg}
													src={beer.image || beerIcon}
													onError={(
														e: React.SyntheticEvent<HTMLImageElement>,
													) => {
														const target = e.target as HTMLImageElement;
														target.src = beerIcon; // 이미지 로드에 실패하면 beerIcon으로 대체
													}}
													alt=""
												/>
											</div>
											<div className={style.beerName}>{beer.name}</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
				;
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
					loadMore={setLoadCategory}
					list={categoryList}
					loading={loading}
				/>
			</Container>
		</div>
	);
}

export default MainPage;
