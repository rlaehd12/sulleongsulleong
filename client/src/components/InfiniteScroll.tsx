import React, { useState, useEffect, useRef, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import customAxios from '../customAxios';
import BeerCard from './beerCard';

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

// keyword는 옵션이라 없어도 괜찮음
// <InfiniteScroll
// 		url="https://api.punkapi.com/v2/beers"
// 		PER_PAGE={10}
// />
interface InfiniteScrollProps {
	url: string;
	PER_PAGE: number;
	keyword?: string;
}

function InfiniteScroll(
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
	const lastBeerRef = useRef<HTMLDivElement | null>(null);
	const observer = useRef<IntersectionObserver | null>(null);

	// 맥주 추가 함수
	// 1. 비동기 요청
	// 2. 요청이 왔을 때 맥주 리스트, 페이지 상태 관리
	// 3. useCallback 사용으로 함수 재생성 방지
	const loadMore = useCallback(async () => {
		// 현재의 lastBeerRef에서 observer를 해제
		if (lastBeerRef.current && observer.current) {
			observer.current.unobserve(lastBeerRef.current);
		}

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
	}, [page]);

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
				console.log(`keyword: ${keyword}`);
				console.log(`keyword type: ${typeof keyword}`);
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

	// beerList가 변경될 때마다 lastBeerRef에 observer를 설정
	useEffect(() => {
		// callback 함수와 옵션은 매개변수로 IntersectionObserver 인스턴스 생성
		observer.current = new IntersectionObserver(handleIntersection, options);

		if (lastBeerRef.current) {
			observer.current.observe(lastBeerRef.current);
		}

		return () => {
			if (lastBeerRef.current && observer.current) {
				observer.current.unobserve(lastBeerRef.current);
			}
		};
	}, [beerList]);

	return (
		<div>
			{beerList.map((beer, index) => {
				if (index === beerList.length - 1) {
					return <BeerCard key={beer.id} beer={beer} ref={lastBeerRef} />;
				}
				return <BeerCard key={beer.id} beer={beer} />;
			})}
			{loading && (
				<div>
					<CircularProgress color="primary" />
				</div>
			)}
		</div>
	);
}

export default InfiniteScroll;
