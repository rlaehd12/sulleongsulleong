import React, { useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import SimpleBeerCard from './simpleBeerCard';

import style from '../styles/listForSimpleBeerCard.module.css';

interface Beer {
	id: number;
	image: string;
	name: string;
}
interface Entry {
	category: string;
	recommendBeers: Beer[];
}
interface InfiniteScrollProps {
	categoryList: Entry[];
	setCategoryList: React.Dispatch<React.SetStateAction<number>>;
	loading: boolean;
}

function ListForSimpleBeerList({
	setCategoryList,
	categoryList,
	loading,
}: InfiniteScrollProps) {
	const targetRef = useRef<HTMLDivElement | null>(null);

	// callback 함수
	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (entry.isIntersecting && categoryList.length === 0) {
			setCategoryList(1);
		}
	};

	// 옵션
	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 1,
	};

	// 초기 화면
	// 1. IntersectionObserver 인스턴스 생성 및 target 감시
	// 3. 마지막에 observer 종료
	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection, options);
		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => {
			if (targetRef.current && observer) {
				observer.unobserve(targetRef.current);
			}
		};
	}, []);

	return (
		<div className={style.categoryList}>
			{categoryList &&
				categoryList.length > 0 &&
				categoryList.map((entry) => {
					return (
						<div className={style.beerListContainer}>
							<h3>{entry.category}</h3>
							<div className={style.beerList}>
								{entry.recommendBeers &&
									entry.recommendBeers.length > 0 &&
									entry.recommendBeers.map((beer) => {
										return <SimpleBeerCard key={beer.id} beer={beer} />;
									})}
							</div>
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
