import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Button,
	Container,
	Select,
	SelectChangeEvent,
	FormControl,
	MenuItem,
	InputLabel,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EjectIcon from '@mui/icons-material/Eject';
import Navbar from '../components/navbar';
import style from '../styles/surveyPage.module.css';

interface Beer {
	image_url: string;
	id: number;
	name: string;
}

function SurveyPage() {
	const PER_PAGE = 20;

	const [beerList, setBeerList] = useState<Beer[]>([]);
	const url = `https://api.punkapi.com/v2/beers?page=1&per_page=${PER_PAGE}`;
	useEffect(() => {
		axios.get(url).then((res) => {
			setBeerList(res.data);
		});
	});

	const [gender, setGender] = useState('');
	const [age, setAge] = useState('');
	const [selectedBeers, setSelectedBeers] = useState<number[]>([]);

	const toggleBeerSelection = (beerId: number) => {
		if (selectedBeers.includes(beerId)) {
			setSelectedBeers(selectedBeers.filter((id) => id !== beerId));
		} else {
			setSelectedBeers([...selectedBeers, beerId]);
		}
	};

	const handleGenderChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};

	const handleAgeChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	return (
		<>
			<Navbar />
			<Container className={style.description}>
				<h2>사용자님의</h2>
				<h2>취향을 알아볼까요?</h2>
				<hr />
				<h3>평소 좋아하는 맥주를 골라주세요</h3>
				<span>선택하신 맥주를 기반으로</span>
				<br />
				<span>새로운 맥주들을 추천해드립니다 :) </span>
				<br />
				<FormControl variant="standard" sx={{ m: 2, minWidth: 240 }}>
					<InputLabel id="select-gender">성별</InputLabel>
					<Select
						id="select-gender"
						value={gender}
						onChange={handleGenderChange}
						label="성별"
					>
						<MenuItem value="m">남성</MenuItem>
						<MenuItem value="w">여성</MenuItem>
					</Select>
				</FormControl>
				<FormControl variant="standard" sx={{ m: 2, minWidth: 240 }}>
					<InputLabel id="select-age">연령대</InputLabel>
					<Select
						id="select-age"
						value={age}
						onChange={handleAgeChange}
						label="연령대"
					>
						<MenuItem value={20}>20대</MenuItem>
						<MenuItem value={30}>30대</MenuItem>
						<MenuItem value={40}>40대</MenuItem>
						<MenuItem value={50}>50대</MenuItem>
						<MenuItem value={60}>60대 이상</MenuItem>
					</Select>
				</FormControl>
				<br />
				<p>맥주 선택하러 가기</p>
				<EjectIcon className={style.icon} />
			</Container>
			<Container className={style.beerChoice}>
				<h3>좋아하는 맥주를 선택해주세요</h3>
				<hr />
				<div className={style.beerList}>
					{beerList.map((beer) => (
						<div key={beer.id} className={style.beerItem}>
							<div
								className={style.imgContainer}
								onClick={() => toggleBeerSelection(beer.id)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										toggleBeerSelection(beer.id);
									}
								}}
								tabIndex={0}
								role="button"
							>
								<img
									className={style.beerImage}
									src={beer.image_url}
									alt={beer.name}
									style={{
										position: 'relative',
										backgroundColor: selectedBeers.includes(beer.id)
											? 'rgba(0, 0, 0, 0.7)'
											: 'transparent',
										filter: selectedBeers.includes(beer.id)
											? 'brightness(50%)'
											: 'none',
									}}
								/>
								{selectedBeers.includes(beer.id) && (
									<CheckIcon className={style.checkIcon} />
								)}
							</div>
							<div className={style.beerName}>{beer.name}</div>
						</div>
					))}
				</div>
				<Button
					className={style.submitBtn}
					variant="contained"
					color="primary"
					sx={{ width: '330px' }}
				>
					선택 완료
				</Button>
			</Container>
		</>
	);
}

export default SurveyPage;
