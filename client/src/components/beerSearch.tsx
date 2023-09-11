import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import style from './beerSearch.module.css';

function BeerSearch() {
	const navigate = useNavigate();
	const [query, setQuery] = useState<string>(''); // 검색어 상태 관리

	/*
	사용자 검색어 입력 중 -> 검색어 상태 변경
	*/
	const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	/*
	사용자 검색어 제출 -> ①내용 없으면 제출 무시 ②검색 결과로 이동
	*/
	const querySubmit = (event: React.FormEvent) => {
		event.preventDefault(); // form 기본 제출 행동을 방지합니다.
		if (query.trim() !== '') navigate(`/searchresult?q=${query.trim()}`); // /searchresult 경로로 이동합니다.
	};

	return (
		<div>
			<form onSubmit={querySubmit}>
				<TextField
					className={style.searchBar}
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
		</div>
	);
}

export default BeerSearch;
