import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import customAxios from '../customAxios';
import BeerCard from './beerCard';
import style from '../styles/InfiniteScroll.module.css';

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

interface InfiniteScrollProps {
	url: string;
	PER_PAGE: number;
	keyword?: string;
}

function ListForBeerCard(
	{
		url = 'https://api.punkapi.com/v2/beers',
		PER_PAGE,
		keyword,
	}: InfiniteScrollProps,
	{ setIsAuthenticated }: Props,
) {
	const threshold = 1;
	const [page, setPage] = useState<number>(1);
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const targetRef = useRef<HTMLDivElement | null>(null);

	// 맥주 추가 함수
	// 1. 비동기 요청
	// 2. 요청이 왔을 때 맥주 리스트, 페이지 상태 관리
	const loadMore = async () => {
		setLoading(true);
		const queryParams: { page: number; size: number; keyword?: string } = {
			page,
			size: PER_PAGE,
		};
		if (keyword !== undefined) {
			queryParams.keyword = keyword;
		}

		await customAxios()
			.get(url, {
				params: queryParams,
			})
			.then((res) => {
				if (Array.isArray(res.data.entries) && res.data.entries.length > 0) {
					setBeerList((prevBeers) => [...prevBeers, ...res.data.entries]);
					setPage((prevPage) => prevPage + 1);
				}
			})
			.catch((error) => {
				console.error('Axios Error:', error);
				if (error.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
		setLoading(false);
	};

	// callback 함수
	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (entry.isIntersecting) {
			loadMore();
		}
	};

	// 옵션
	const options = {
		root: null,
		rootMargin: '0px',
		threshold,
	};

	// 초기 화면
	// 1. 요청한 맥주 정보를 맥주 리스트에 추가
	// 2. page 상태 변화
	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection, options);
		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		setPage(1);
		setBeerList([]);

		const queryParams: { page: number; size: number; keyword?: string } = {
			page,
			size: PER_PAGE,
		};
		if (keyword !== undefined) {
			queryParams.keyword = keyword;
		}

		customAxios()
			.get(url, {
				params: queryParams,
			})
			.then((res) => {
				if (Array.isArray(res.data.entries)) {
					setBeerList((prevBeers) => [...prevBeers, ...res.data.entries]);
				}
				setPage((prevPage) => prevPage + 1);
			})
			.catch((error) => {
				console.error('Axios Error:', error);
				if (error.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
	}, [keyword]);

	return (
		<div>
			{beerList.map((beer, index) => {
				if (index === beerList.length - 1) {
					return <BeerCard key={beer.id} beer={beer} />;
				}
				return <BeerCard key={beer.id} beer={beer} />;
			})}
			<div ref={targetRef} />
			{loading && (
				<div className={style.circularProgress}>
					<CircularProgress color="primary" />
				</div>
			)}
		</div>
	);
}

export default ListForBeerCard;
