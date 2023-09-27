import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
	Container,
	Rating,
	Button,
	Modal,
	TextField,
	Alert,
	AlertTitle,
} from '@mui/material';
import beerIcon from '../images/beer.png';
import Preference from '../components/preference';
import LoginModal from '../components/loginModal';

import style from '../styles/beerDetail.module.css';
import customAxios from '../customAxios';

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface reviews {
	reviewId: number;
	content: string;
	score: number;
}

interface BeerDetail {
	imageUrl: string;
	name: string;
	largeCategory: string;
	subCategory: string;
	abv: number;
	isPreference: boolean;
	preferCount: number;
	entries: reviews[];
}

function DetailPage({ setIsAuthenticated }: Props) {
	const axiosInstance = customAxios();
	const [beerInfo, setBeerInfo] = useState<BeerDetail>({} as BeerDetail);
	const [open, setOpen] = useState(false);
	const [reviewText, setReviewText] = useState('');
	const [rate, setRate] = useState(2.5);
	const [isDuplicate, setIsDuplicate] = useState(false);
	const { beerId } = useParams<{ beerId: string }>();
	const id: number = beerId === undefined ? 1 : parseInt(beerId, 10);
	const [openModal, setOpenModal] = useState<boolean>(false);
	useEffect(() => {
		axiosInstance
			.get(`/beers/${id}`)
			.then((res) => {
				setBeerInfo(res.data);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setIsAuthenticated(false);
				}
			});
	}, []);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setIsDuplicate(false);
	};
	const handleReviewTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setReviewText(e.target.value);
	};
	const postReview = () => {
		axiosInstance
			.post(`reviews/beers/${id}`, {
				content: reviewText,
				score: rate * 2,
			})
			.then(() => {
				handleClose();
				setReviewText('');
			})
			.catch((err) => {
				if (err.response.status === 409) {
					setIsDuplicate(true);
				}
			});
	};

	const clickPrefer = (targerBeerId: number) => {
		customAxios()
			.post(`/beers/preference/${targerBeerId}`)
			.then((res) => {
				beerInfo.isPreference = res.data.result;
				beerInfo.preferCount = res.data.like;
			})
			.catch((err) => {
				console.error('Error sending the request:', err);
				if (err.response.status === 401) {
					setOpenModal(true);
				}
			});
	};

	return (
		<>
			<Container>
				<div>
					<img
						className={style.beerImg}
						src={beerInfo.imageUrl}
						onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
							const target = e.target as HTMLImageElement;
							target.src = beerIcon; // 이미지 로드에 실패하면 beerIcon으로 대체
						}}
						alt="맥주이름"
					/>
					<hr className={style.divider} />
					<div className={style.beerTitle}>
						<span className={style.beerInfo}>
							<strong>이름</strong>
							<span>{beerInfo.name}</span>
						</span>
						<Preference
							beerId={id}
							prefer={beerInfo.isPreference}
							preferCount={beerInfo.preferCount}
							clickPrefer={clickPrefer}
						/>
					</div>
					<p className={style.beerInfo}>
						<strong>
							{beerInfo.largeCategory} {'>'}
						</strong>
						{beerInfo.subCategory}
					</p>
					<p className={style.beerInfo}>
						<strong>도수</strong>
						{beerInfo.abv}%
					</p>
					<hr className={style.divider} />
					<h3>리뷰</h3>
					{Array.isArray(beerInfo.entries) &&
						beerInfo.entries.map((review) => (
							<Container className={style.review}>
								<Rating name="별점" value={review.score / 2} readOnly />
								<p>{review.content}</p>
							</Container>
						))}
					<div className={style.btnContainer}>
						<Button
							className={style.reviewBtn}
							variant="contained"
							color="primary"
							onClick={handleOpen}
						>
							리뷰 작성하기
						</Button>
					</div>
					{openModal && (
						<LoginModal openModal={openModal} setOpenModal={setOpenModal} />
					)}
				</div>
			</Container>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modalT itle"
					aria-describedby="modalDescription"
				>
					<Container className={style.modalContent}>
						<h2 id="modalTitle">리뷰 작성하기</h2>
						<div id="modalDescription" className={style.modalDescription}>
							<hr className={style.divider} />
							<div className={style.ratingDiv}>
								<strong>별점</strong>
								<Rating
									className={style.rating}
									name="별점"
									value={rate}
									precision={0.5}
									size="large"
									onChange={(event, newValue: number | null) => {
										if (newValue !== null) {
											setRate(newValue);
										} else {
											setRate(0);
										}
									}}
								/>
							</div>
							<div className={style.descriptionContent}>
								<TextField
									className={style.reviewText}
									label="리뷰 작성"
									variant="outlined"
									value={reviewText}
									multiline
									rows={8}
									onChange={handleReviewTextChange}
								/>
								{isDuplicate && (
									<Alert severity="error">
										<AlertTitle>오류!</AlertTitle>
										한 맥주에 한번만 리뷰를 달 수 있습니다! <br />
										<strong>이미 리뷰가 작성된 맥주입니다!!</strong>
									</Alert>
								)}
								<Button
									className={style.reviewBtn}
									variant="contained"
									color="primary"
									onClick={postReview}
								>
									리뷰 등록하기
								</Button>
							</div>
						</div>
					</Container>
				</Modal>
			</div>
		</>
	);
}

export default DetailPage;
