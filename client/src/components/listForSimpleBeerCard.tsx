import React, { useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import SimpleBeerCard from './simpleBeerCard';

import style from '../styles/InfiniteScroll.module.css';

interface Beer {
	id: number;
	image: string;
	name: string;
}
interface Entry {
	category: string;
	recommenBeers: Beer[];
}
interface InfiniteScrollProps {
	categoryList: Entry[];
	loadCategoryList: () => void;
	loading: boolean;
}

function ListForSimpleBeerList({
	loadCategoryList,
	categoryList,
	loading,
}: InfiniteScrollProps) {
	const targetRef = useRef<HTMLDivElement | null>(null);

	// callback 함수
	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (entry.isIntersecting) {
			loadCategoryList();
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
		<div className={style.listWrap}>
			{categoryList &&
				categoryList.length > 0 &&
				categoryList.map((entry) => {
					return (
						<div className={style.categoryList}>
							<h3>{entry.category}</h3>
							<Divider />
							{entry.recommenBeers &&
								entry.recommenBeers.length > 0 &&
								entry.recommenBeers.map((beer) => {
									return (
										<div className={style.beerList}>
											<SimpleBeerCard key={beer.id} beer={beer} />;
										</div>
									);
								})}
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
