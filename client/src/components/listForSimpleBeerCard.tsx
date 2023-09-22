import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import customAxios from '../customAxios';
import SimpleBeerCard from './simpleBeerCard';

import style from '../styles/InfiniteScroll.module.css';

interface Beer {
	id: number;
	image: string;
	nameKor: string;
}

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InfiniteScrollProps {
	url: string;
	PER_PAGE: number;
}

function ListForSimpleBeerList(
	{ url = 'https://api.punkapi.com/v2/beers', PER_PAGE }: InfiniteScrollProps,
	{ setIsAuthenticated }: Props,
) {
	const threshold = 1;
	const [page, setPage] = useState<number>(1);
	const [categoryList, setCategoryList] = useState<{
		[category: string]: Beer[];
	}>({});
	const [loading, setLoading] = useState<boolean>(false);
	const targetRef = useRef<HTMLDivElement | null>(null);

	const mockData: { [key: string]: Beer[] } = {
		Lager: [
			{
				id: 1,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Classic Lager',
			},
			{
				id: 2,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Golden Lager',
			},
		],
		Ale: [
			{
				id: 3,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Pale Ale',
			},
			{
				id: 4,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Brown Ale',
			},
		],
		Stout: [
			{
				id: 5,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Dry Stout',
			},
			{
				id: 6,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Imperial Stout',
			},
		],
		정승구: [
			{
				id: 7,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Classic Lager',
			},
			{
				id: 8,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Golden Lager',
			},
		],
		김성훈: [
			{
				id: 9,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Pale Ale',
			},
			{
				id: 10,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Brown Ale',
			},
		],
		김상연: [
			{
				id: 11,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Dry Stout',
			},
			{
				id: 12,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Imperial Stout',
			},
		],
		권민재: [
			{
				id: 13,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Classic Lager',
			},
			{
				id: 14,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Golden Lager',
			},
		],
		김인범: [
			{
				id: 15,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Pale Ale',
			},
			{
				id: 16,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Brown Ale',
			},
		],
		김동욱: [
			{
				id: 17,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Dry Stout',
			},
			{
				id: 18,
				image: 'https://picsum.photos/200/300​',
				nameKor: 'Imperial Stout',
			},
		],
	};

	// 맥주 추가 함수
	// 1. 비동기 요청
	// 2. 요청이 왔을 때 맥주 리스트, 페이지 상태 관리
	const loadMore = async () => {
		setLoading(true);
		const queryParams: { page: number; size: number; keyword?: string } = {
			page,
			size: PER_PAGE,
		};

		// await customAxios()
		// 	.get(url, {
		// 		params: queryParams,
		// 	})
		// 	.then((res: { data: { [category: string]: Beer[] } }) => {
		// 		setCategoryList((prevCategorys) => {
		// 			return { ...prevCategorys, ...res.data };
		// 		});
		// 		setPage((prevPage) => prevPage + 1);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Axios Error:', error);
		// 		if (error.response.status === 401) {
		// 			setIsAuthenticated(false);
		// 		}
		// 	});
		console.log('무한스크롤 작동');
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
	// 3. 마지막에 observer 종료
	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection, options);
		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		setPage(1);
		setCategoryList({});

		const queryParams: { page: number; size: number; keyword?: string } = {
			page,
			size: PER_PAGE,
		};

		// customAxios()
		// 	.get(url, {
		// 		params: queryParams,
		// 	})
		// 	.then((res) => {
		// 		setCategoryList((prevCategorys) => {
		// 			return { ...prevCategorys, ...res.data };
		// 		});
		// 		setPage((prevPage) => prevPage + 1);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Axios Error:', error);
		// 		if (error.response.status === 401) {
		// 			setIsAuthenticated(false);
		// 		}
		// 	});

		return () => {
			if (targetRef.current && observer) {
				observer.unobserve(targetRef.current);
			}
		};
	}, []);

	return (
		<div className={style.listWrap}>
			{/* {Object.keys(categoryList).map((key) => {
				return (
					<div className={style.categoryList}>
						<h3>{key}</h3>
						<Divider />
						{categoryList[key].map((beer) => {
							return (
								<div className={style.beerList}>
									<SimpleBeerCard key={beer.id} beer={beer} />;
								</div>
							);
						})}
						<Divider />
					</div>
				);
			})} */}
			{Object.keys(mockData).map((key) => {
				return (
					<div className={style.categoryList}>
						<h3>{key}</h3>
						<Divider />
						<div className={style.beerList}>
							{mockData[key].map((beer) => {
								return <SimpleBeerCard key={beer.id} beer={beer} />;
							})}
						</div>
						<Divider />
					</div>
				);
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

export default ListForSimpleBeerList;
