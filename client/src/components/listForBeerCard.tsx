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
	beerList: Beer[];
	loadBeerList: () => void;
	loading: boolean;
}

function ListForBeerCard({
	beerList,
	loadBeerList,
	loading,
}: InfiniteScrollProps) {
	const targetRef = useRef<HTMLDivElement | null>(null);

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (entry.isIntersecting) {
			loadBeerList();
		}
	};

	// 옵션
	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 1,
	};

	// 초기 화면
	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection, options);
		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div>
			{beerList &&
				beerList.length > 0 &&
				beerList.map((beer) => {
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
