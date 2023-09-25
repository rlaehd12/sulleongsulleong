import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Rating, Button, Modal, TextField } from '@mui/material';
import beerIcon from '../images/beer.png';
import Preference from '../components/preference';
import style from '../styles/beerDetail.module.css';
import customAxios from '../customAxios';

interface Props {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface reviews {
	reviewId: number;
	content: string;
	rating: number;
}

interface BeerDetail {
	imageUrl: string;
	name: string;
	largeCategory: string;
	subCategory: string;
	abv: number;
	isPreference: boolean;
	entries: reviews[];
}

function DetailPage({ setIsAuthenticated }: Props) {
	const axiosInstance = customAxios();
	const [open, setOpen] = useState(false);
	const [reviewText, setReviewText] = useState('');
	const [rate, setRate] = useState(2.5);
	const { beerId } = useParams<{ beerId: string }>();
	const id: number = beerId === undefined ? 1 : parseInt(beerId, 10);
	useEffect(() => {
		axiosInstance
			.get(`/beers/${id}`)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleReviewTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setReviewText(e.target.value);
	};
	const postReview = () => {
		axiosInstance.post(`reviews/beers/${id}`, {
			content: reviewText,
			score: rate * 2,
		});
	};

	return (
		<>
			<Container>
				<div>
					<img className={style.beerImg} src={beerIcon} alt="맥주이름" />
					<hr className={style.divider} />
					<div className={style.beerTitle}>
						<span className={style.beerInfo}>
							<strong>이름</strong>
							<span>맥주이름 와랄ㄹ랄라</span>
						</span>
						<Preference beerId={1} />
					</div>
					<p className={style.beerInfo}>
						<strong>Large Category</strong>
						{'>'} sub Category
					</p>
					<p className={style.beerInfo}>
						<strong>도수</strong>
						n.n%
					</p>
					<hr className={style.divider} />
					<h3>리뷰</h3>
					<Container className={style.review}>
						<Rating name="별점" value={2.5} readOnly />
						<p>리뷰 comment랑</p>
						<p>mui에서 rating 기능 가져와서 찍어주어요</p>
					</Container>
					<Container className={style.review}>
						<Rating name="별점" value={2.5} readOnly />
						<p>
							리뷰 Comment
							길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다길이테스트중입니다
						</p>
					</Container>
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
