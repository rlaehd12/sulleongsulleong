import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { MemberName } from 'typescript';
import customAxios from '../customAxios';
import InfiniteScroll from '../components/InfiniteScroll';

import style from '../styles/mainpage.module.css';

import event1 from '../images/event1.jpg';
import event2 from '../images/event2.jpg';
import event3 from '../images/event3.jpg';
import SimpleBeerCard from '../components/simpleBeerCard';

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
			.get('/beers/recommend/main')
			.then((res) => {
				const { memberName, ...lists } = res.data;
				setMainRecommendList(lists);

				setUserInfo((prevUserInfo) => ({ ...prevUserInfo, name: memberName }));
				if (res.data.todayBeers.length === 0) {
					// eslint-disable-next-line no-alert
					alert(
						'아직 설문조사를 진행하지 않았습니다! 설문조사 페이지로 이동합니다',
					);
					navigate('/survey');
				}

				return axiosInstance.get('/members/info');
			})
			.then((res) => {
				const determineGender = (gender: string) => {
					if (gender === 'M') return '남성';
					if (gender === 'F') return '여성';
					return '';
				};

				setUserInfo((prevUserInfo) => ({
					...prevUserInfo,
					gender: determineGender(res.data.gender),
					age: res.data.age === null ? 0 : res.data.age,
				}));
			})
			.catch((err) => {
				console.error('Axios Error:', err.response.status);
				if (err.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
	}, []);

	const loadCategoryList = async () => {
		if (categoryList.length > 0) return; // 한 번 호출되었으면 재요청 방지

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
			<hr className={style.titlehr} />
			<Container>
				<div className={style.recommendList}>
					{Object.keys(mainRecommendList).map((key) => {
						const recommendKey = key as keyof MainRecommend;
						let disc;
						switch (key) {
							case 'todayBeers':
								disc = (
									<span>
										{userInfo.name.length <= 20 ? `${userInfo.name}님, ` : ''}
										오늘은 이런 맥주 어떤가요?
									</span>
								);
								break;
							case 'popularBeers':
								disc = <span>많은 분들이 좋아해요</span>;
								break;
							case 'similarPeoplesBeers':
								disc =
									userInfo.age !== 0 && userInfo.gender !== '' ? (
										<span>
											{userInfo.age}대 {userInfo.gender}분들이 좋아해요
										</span>
									) : null;
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
									{disc &&
										mainRecommendList[recommendKey].map((beer: Beer) => {
											return <SimpleBeerCard key={beer.id} beer={beer} />;
										})}
								</div>
							</div>
						);
					})}
				</div>
			</Container>
			<Container className={style.surveyArea}>
				<span>술을 잘 모르시나요?</span>
				<p>나에게 맞는 술 찾으러 가기</p>
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
