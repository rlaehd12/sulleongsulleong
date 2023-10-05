import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Container,
	Select,
	SelectChangeEvent,
	FormControl,
	MenuItem,
	InputLabel,
	Alert,
	AlertTitle,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EjectIcon from '@mui/icons-material/Eject';
import customAxios from '../customAxios';
import style from '../styles/surveyPage.module.css';
import beerIcon from '../images/beer.png';

interface Beer {
	id: number;
	image: string;
	nameKor: string;
	largeCategory: string;
}
interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function SurveyPage({ setIsAuthenticated }: Props) {
	const navigate = useNavigate();
	const [beerList, setBeerList] = useState<Beer[]>([]);
	const [canSubmit, setCanSubmit] = useState<boolean>(false); // 선택된 맥주가 5개 이상인지 확인하는 상태
	const [error, setError] = useState<boolean>(false);
	const axiosInstance = customAxios();
	useEffect(() => {
		axiosInstance
			.get<{ entries: Beer[] }>('/beers/survey')
			.then((res) => {
				setBeerList(res.data.entries);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [gender, setGender] = useState('');
	const [age, setAge] = useState<string>('');
	const [beerIds, setBeerIds] = useState<number[]>([]);

	useEffect(() => {
		if (beerIds.length >= 5) {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}
	}, [beerIds]);

	useEffect(() => {
		if (gender !== '') {
			axiosInstance.patch(`/members/gender?value=${gender}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gender]);

	useEffect(() => {
		if (age !== '') {
			axiosInstance.patch(`/members/age?value=${age}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [age]);

	const toggleBeerSelection = (beerId: number) => {
		if (beerIds.includes(beerId)) {
			setBeerIds(beerIds.filter((id) => id !== beerId));
		} else {
			setBeerIds([...beerIds, beerId]);
		}
	};

	const handleGenderChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};

	const handleAgeChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	const postSurvey = () => {
		axiosInstance
			.post(`/beers/preference/survey`, {
				beerIds,
			})
			.then((res: { status: number }) => {
				if (res.status === 200) {
					navigate('/surveyComp');
				}
			})
			.catch((err) => {
				if (err.response && err.response.status === 400) {
					setError(true);
				}
			});
	};

	return (
		<div>
			<Container className={style.description}>
				<div className={style.title}>
					<span>사용자님의</span>
					<br />
					<span>취향을 알아볼까요?</span>
				</div>

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
						<MenuItem value="M">남성</MenuItem>
						<MenuItem value="F">여성</MenuItem>
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
					{Array.isArray(beerList) &&
						beerList.map((beer) => (
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
										src={beer.image || beerIcon}
										onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
											const target = e.target as HTMLImageElement;
											target.src = beerIcon; // 이미지 로드에 실패하면 beerIcon으로 대체
										}}
										alt=""
										style={{
											position: 'relative',
											backgroundColor: beerIds.includes(beer.id)
												? 'rgba(0, 0, 0, 0.7)'
												: 'transparent',
											filter: beerIds.includes(beer.id)
												? 'brightness(50%)'
												: 'none',
										}}
									/>
									{beerIds.includes(beer.id) && (
										<CheckIcon className={style.checkIcon} />
									)}
								</div>
								<div className={style.beerName}>{beer.nameKor}</div>
							</div>
						))}
				</div>
				{error && (
					<Alert severity="error">
						<AlertTitle>에러</AlertTitle>
						5개 이상의 맥주를 선택해주세요.
					</Alert>
				)}
				<Button
					className={style.submitBtn}
					variant="contained"
					color="primary"
					sx={{
						width: '330px',
						margin: '0 auto', // 가운데 정렬 스타일
						display: 'block', // 가운데 정렬을 위해 블록 레벨 요소로 설정
					}}
					onClick={postSurvey}
					disabled={!canSubmit}
				>
					선택 완료
				</Button>
				<div className={style.errMessage}>
					{!canSubmit && <p>5개 이상의 맥주를 선택해주세요.</p>}
				</div>
			</Container>
		</div>
	);
}

export default SurveyPage;
