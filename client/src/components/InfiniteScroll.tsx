import React from 'react';
import ListForBeerCard from './listForBeerCard';
import ListForSimpleBeerCard from './listForSimpleBeerCard';

interface InfiniteScrollProps {
	url: string;
	PER_PAGE: number;
	keyword?: string;
	Component: 'beerCard' | 'simpleBeerCard';
}

function InfiniteScroll({
	url = 'https://api.punkapi.com/v2/beers',
	PER_PAGE,
	keyword,
	Component,
}: InfiniteScrollProps) {
	if (Component === 'beerCard') {
		return <ListForBeerCard url={url} PER_PAGE={PER_PAGE} keyword={keyword} />;
	}
	if (Component === 'simpleBeerCard') {
		return <ListForSimpleBeerCard url={url} PER_PAGE={PER_PAGE} />;
	}
	return null;
}

export default InfiniteScroll;
