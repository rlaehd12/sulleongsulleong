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
	recommenBeers: Beer[];
}
interface InfiniteScrollProps {
	Component: 'beerCard' | 'simpleBeerCard';
	loadMore: () => void;
	list: ExtendedBeer[] | Entry[];
	loading: boolean;
}

function isExtendedBeerList(
	list: ExtendedBeer[] | Entry[],
): list is ExtendedBeer[] {
	if (!list.length || !list[0]) {
		return false;
	}
	return (list[0] as ExtendedBeer).largeCategory !== undefined;
}

function InfiniteScroll({
	Component,
	loadMore,
	list,
	loading,
}: InfiniteScrollProps) {
	if (Component === 'beerCard' && isExtendedBeerList(list)) {
		return (
			<ListForBeerCard
				beerList={list}
				loadBeerList={loadMore}
				loading={loading}
			/>
		);
	}
	if (Component === 'simpleBeerCard' && !isExtendedBeerList(list)) {
		return (
			<ListForSimpleBeerCard
				categoryList={list}
				loadCategoryList={loadMore}
				loading={loading}
			/>
		);
	}

	return null;
}

export default InfiniteScroll;
