import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
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
import InfiniteScroll from '../components/InfiniteScroll';
import ScrollButton from '../components/scrollButton';
import LoginModal from '../components/loginModal';

import customAxios from '../customAxios';
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
	prefer: boolean;
	preferCount: number;
}
interface Params {
	page: number;
	size: number;
	keyword: string;
}
interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchResultPage({ setIsAuthenticated }: Props) {
	const [query, setQuery] = useState<string>('');
	const [searchQuery, setSearchQuery] = useSearchParams({ q: '' });
	const [page, setPage] = useState<number>(0);
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const queryClient = useQueryClient();

	// 페이지 진입 및 검색했을 때 상태 초기화
	useEffect(() => {
		setBeerList([]);
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

	const loadBeerList = async () => {
		setLoading(true);
		const params: Params = {
			page: page + 1,
			size: 10,
			keyword: searchQuery.get('q') || '',
		};

		await customAxios()
			.get('/beers/search', { params })
			.then((res) => {
				if (Array.isArray(res.data.entries) && res.data.entries.length > 0) {
					setBeerList((prevBeers) => [...prevBeers, ...res.data.entries]);
				}
			})
			.catch((err) => {
				console.error('Axios Error:', err.response.status);
				if (err.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
		setLoading(false);
	};

	// 페이지 상태 변경에 따른 리스트 추가
	useEffect(() => {
		loadBeerList();
	}, [page, searchQuery]);

	// const clickPrefer = (targerBeerId: number) => {
	// 	customAxios()
	// 		.post(`/beers/preference/${targerBeerId}`)
	// 		.then((res) => {
	// 			const updateBeerList = [...beerList];
	// 			updateBeerList[res.data.memberId].prefer = res.data.result;
	// 			updateBeerList[res.data.memberId].preferCount = res.data.like;

	// 			setBeerList(updateBeerList);
	// 		})
	// 		.catch((err) => {
	// 			console.error('Error sending the request:', err);
	// 			if (err.response.status === 401) {
	// 				setOpenModal(true);
	// 				console.log(openModal);
	// 			}
	// 		});
	// };

	const toggleBeerPreference = async (targetBeerId: number) => {
		return customAxios().post(`/beers/preference/${targetBeerId}`);
	};

	const preferenceMutation = useMutation(toggleBeerPreference, {
		onSuccess: (res, targetBeerId) => {
			// beerList 상태를 업데이트
			const updateBeerList = [...beerList];
			const beerIndex = beerList.findIndex((beer) => beer.id === targetBeerId);

			updateBeerList[beerIndex].prefer = res.data.result;
			updateBeerList[beerIndex].preferCount = res.data.like;

			setBeerList(updateBeerList);
		},
		onError: (err: AxiosError) => {
			console.error('Error sending the request:', err);
			if (err.response?.status === 401) {
				setOpenModal(true);
			}
		},
	});

	const clickPrefer = (targetBeerId: number) => {
		preferenceMutation.mutate(targetBeerId);
	};

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
						{openModal && (
							<LoginModal openModal={openModal} setOpenModal={setOpenModal} />
						)}
						<InfiniteScroll
							Component="beerCard"
							loadMore={setPage}
							list={beerList}
							loading={loading}
							clickPrefer={clickPrefer}
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
