import React, { useState, useEffect, useRef, useCallback } from 'react';
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

interface InfiniteScrollProps {
	url: string;
	PER_PAGE: number;
	keyword?: string;
}

// 옵션
const options = {
	root: null,
	rootMargin: '0px',
	threshold: 1,
};

function ListForBeerCard({
	url = 'https://api.punkapi.com/v2/beers',
	PER_PAGE,
	keyword,
}: InfiniteScrollProps) {
	const [page, setPage] = useState<number>(0);
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const targetRef = useRef<HTMLDivElement | null>(null);

	// 맥주 추가 함수
	// 1. 비동기 요청
	// 2. 요청이 왔을 때 맥주 리스트, 상태 관리
	const loadMore = useCallback(
		async (currentPage: number) => {
			setLoading(true);
			const queryParams: { page: number; size: number; keyword?: string } = {
				page: currentPage,
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
					}
				});
			setLoading(false);
		},
		[PER_PAGE, keyword, url],
	);

	// callback 함수
	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (entry.isIntersecting) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	// 무한스크롤 flow
	// 1. target 교차 => 2. callback함수 호출(page 증가) => 3. loadMore함수 호출(axios 요청 및 list 관리)
	useEffect(() => {
		if (page !== 0) {
			loadMore(page);
		}
	}, [page]);

	// 초기 화면
	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection, options);
		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		setPage(0);
		setBeerList([]);

		return () => observer.disconnect();
	}, [keyword]);

	return (
		<div>
			{beerList.map((beer) => {
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
