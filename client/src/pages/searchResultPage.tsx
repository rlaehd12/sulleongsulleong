import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import {
	InputAdornment,
	TextField,
	Container,
	InputBaseComponentProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import TabBar from '../components/tabBar';
import style from '../styles/search.module.css';
import InfiniteScroll from '../components/InfiniteScroll';

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchResultPage({ setIsAuthenticated }: Props) {
	// input tag 상태관리, url 상태 관리
	const [query, setQuery] = useState<string>('');
	const [searchQuery, setSearchQuery] = useSearchParams({ q: '' });

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
		<>
			<Navbar />
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
										<SearchIcon
											className={style.search}
											onClick={querySubmit}
										/>
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
						<InfiniteScroll
							url="/beers/search"
							PER_PAGE={10}
							keyword={searchQuery.get('q') || undefined}
						/>
					</div>
				</Container>
			</div>
			<TabBar />
		</>
	);
}

export default SearchResultPage;
