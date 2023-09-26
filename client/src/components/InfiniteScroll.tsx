import React from 'react';
import ListForBeerCard from './listForBeerCard';
import ListForSimpleBeerCard from './listForSimpleBeerCard';

interface Beer {
	id: number;
	image: string;
	name: string;
}

interface ExtendedBeer extends Beer {
	nameKor: string;
	abv: number;
	largeCategory: string;
	subCategory: string;
	country: string;
	score: number;
}

interface Entry {
	category: string;
	recommendBeers: Beer[];
}
interface InfiniteScrollProps {
	Component: 'beerCard' | 'simpleBeerCard';
	loadMore: React.Dispatch<React.SetStateAction<number>>;
	list: ExtendedBeer[] | Entry[];
	loading: boolean;
}

function InfiniteScroll({
	Component,
	loadMore,
	list,
	loading,
}: InfiniteScrollProps) {
	if (Component === 'beerCard') {
		return (
			<ListForBeerCard
				beerList={list as ExtendedBeer[]}
				setPage={loadMore}
				loading={loading}
			/>
		);
	}
	if (Component === 'simpleBeerCard') {
		return (
			<ListForSimpleBeerCard
				categoryList={list as Entry[]}
				setCategoryList={loadMore}
				loading={loading}
			/>
		);
	}

	return null;
}

export default InfiniteScroll;
