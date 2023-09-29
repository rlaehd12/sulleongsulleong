import React, { useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import BeerCard from './beerCard';
import style from '../styles/listForBeerCard.module.css';

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
	prefer: boolean;
	preferCount: number;
}

interface InfiniteScrollProps {
	beerList: Beer[];
	setPage: React.Dispatch<React.SetStateAction<number>>;
	loading: boolean;
	clickPrefer: (targerBeerId: number) => void;
}

function ListForBeerCard({
	beerList,
	setPage,
	loading,
	clickPrefer,
}: InfiniteScrollProps) {
	const targetRef = useRef<HTMLDivElement | null>(null);

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (entry.isIntersecting && beerList.length === 0) {
			setPage(0);
		} else if (entry.isIntersecting && beerList.length % 10 === 0) {
			setPage((prevPage) => prevPage + 1);
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

		return () => {
			if (targetRef.current && observer) {
				observer.unobserve(targetRef.current);
			}
		};
	}, [beerList]);

	return (
		<div>
			{beerList &&
				beerList.length > 0 &&
				beerList.map((beer) => {
					return (
						<div className={style.beerList}>
							<BeerCard key={beer.id} beer={beer} clickPrefer={clickPrefer} />
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

export default ListForBeerCard;
