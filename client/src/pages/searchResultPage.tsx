import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import {
	InputAdornment,
	TextField,
	Container,
	InputBaseComponentProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import customAxios from '../customAxios';

import BeerCard from '../components/beerCard';
import style from '../styles/search.module.css';

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
interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchResultPage({ setIsAuthenticated }: Props) {
	const PER_PAGE = 10;

	const [beerList, setBeerList] = useState<Beer[]>([]);
	// input tag 상태관리, url 상태 관리
	const [query, setQuery] = useState<string>('');
	const [searchQuery, setSearchQuery] = useSearchParams({ q: '' });

	const axiosInstance = customAxios();

	const url = `/beers/search?keyword=${searchQuery.get(
		'q',
	)}&page=1&size=${PER_PAGE}`;
	useEffect(() => {
		axiosInstance
			.get(url)
			.then((res) => {
				setBeerList(res.data.entries);
			})
			.catch((error) => {
				console.error('Axios Error:', error);
				if (error.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
	}, [searchQuery]);

	// input tag 변경 시 query 상태 변경
	const changeQuery = useCallback((event: InputBaseComponentProps) => {
		setQuery(event.target.value);
	}, []);

	// form submit시 useSearchParams hook을 이용해서 url parameter 변경
	const querySubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			const params = {
				q: query,
			};
			setSearchQuery(params);
		},
		[query],
	);

	return (
		<div className={style.searchContainer}>
			<Container>
				<form onSubmit={querySubmit}>
					<TextField
						id="standard-search"
						label="어떤 술을 찾으시나요?"
						type="search"
						variant="standard"
						onChange={changeQuery}
						value={query}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</form>
				<p>{searchQuery.get('q')} 에 대한 검색 결과</p>
			</Container>
			<hr />
			<Container>
				<div>
					{beerList.map((beer) => (
						<BeerCard key={beer.id} beer={beer} />
					))}
				</div>
			</Container>
		</div>
	);
}

export default SearchResultPage;
