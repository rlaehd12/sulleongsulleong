import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import ListForBeerCard from './listForBeerCard';
import ListForSimpleBeerCard from './listForSimpleBeerCard';

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
	Component: 'beerCard' | 'simpleBeerCard';
}

function InfiniteScroll(
	{
		url = 'https://api.punkapi.com/v2/beers',
		PER_PAGE,
		keyword,
		Component,
	}: InfiniteScrollProps,
	{ setIsAuthenticated }: Props,
) {
	if (Component === 'beerCard') {
		return <ListForBeerCard url={url} PER_PAGE={PER_PAGE} keyword={keyword} />;
	}
	if (Component === 'simpleBeerCard') {
		return <ListForSimpleBeerCard url={url} PER_PAGE={PER_PAGE} />;
	}
	return null;
}

export default InfiniteScroll;
