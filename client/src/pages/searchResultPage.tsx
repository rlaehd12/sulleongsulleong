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
import ScrollButton from '../components/scrollButton';
import customAxios from '../customAxios';

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
	// input tag 상태관리, url 상태 관리
	const [query, setQuery] = useState<string>('');
	const [searchQuery, setSearchQuery] = useSearchParams({ q: '' });
	const [page, setPage] = useState<number>(0);
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

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

	const loadBeerList = async () => {
		try {
			setLoading(true);
			const res = await customAxios().get(
				`/beers/search?keyword=${searchQuery.get('q')}&page=${
					page + 1
				}&size=10`,
			);
			if (Array.isArray(res.data.entries) && res.data.entries.length > 0) {
				setPage(page + 1);
				setBeerList((prevBeers) => [...prevBeers, ...res.data.entries]);
			}
		} catch (error) {
			// 요청이 실패할 경우에 대한 에러 핸들링도 추가할 수 있습니다.
			console.error('Error fetching search beer list:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setPage(0);
		setBeerList([]);
		loadBeerList();
		console.log('초기화');
	}, [searchQuery]);

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
							Component="beerCard"
							loadMore={loadBeerList}
							list={beerList}
							loading={loading}
						/>
					</div>
				</Container>
			</div>
			<ScrollButton />
			<TabBar />
		</>
	);
}

export default SearchResultPage;
