import React, { useState, useEffect, useRef, useCallback } from 'react';
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

function InfiniteScroll() {
	const PER_PAGE = 10;
	const threshold = 1;
	const [page, setPage] = useState<number>(1);
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const lastBeerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const initialUrl = `https://api.punkapi.com/v2/beers?page=1&per_page=${PER_PAGE}`;
		customAxios()
			.get(initialUrl)
			.then((res) => {
				setBeerList([...res.data]);
				setPage((prevPage) => prevPage + 1);
				console.log('세팅!!');
				console.log(`맥주 리스트의 개수: ${beerList.length}`);
				console.log(res.data);
			});
	}, []);

	const loadMore = useCallback(async () => {
		console.log(`페이지: ${page}`);
		console.log(`맥주 리스트의 개수: ${beerList.length}`);
		setLoading(true);
		const currentUrl = `https://api.punkapi.com/v2/beers?page=${
			page + 1
		}&per_page=${PER_PAGE}`;
		await customAxios()
			.get(currentUrl)
			.then((res) => {
				if (res.data.length > 0) {
					setBeerList((prevBeers) => [...prevBeers, ...res.data]);
					setPage((prevPage) => prevPage + 1);
				}
			});
		setLoading(false);
	}, [page]);

	useEffect(() => {
		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				loadMore();
			}
		};

		const options = {
			root: null,
			rootMargin: '0px',
			threshold,
		};

		const observer = new IntersectionObserver(handleIntersection, options);

		if (lastBeerRef.current) {
			observer.observe(lastBeerRef.current);
		}

		return () => {
			if (lastBeerRef.current) {
				observer.unobserve(lastBeerRef.current);
			}
		};
	}, [loadMore, threshold]);

	return (
		<div>
			{beerList.map((beer, index) => {
				if (index === beerList.length - 1) {
					return <BeerCard key={beer.id} beer={beer} ref={lastBeerRef} />;
				}
				return <BeerCard key={beer.id} beer={beer} />;
			})}
			{loading && <div>Loading...</div>}
		</div>
	);
}

export default InfiniteScroll;
