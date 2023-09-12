import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import style from './beerCard.module.css';

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

interface BeerCardProps {
	beer: Beer;
}

function BeerCard({ beer }: BeerCardProps) {
	const [isFavorite, setIsFavorite] = useState<boolean>(false); // 좋아요 상태 관리
	const [rate, setRate] = useState<number>(3.5); // 평점 상태 관리

	/*
	사용자 좋아요 클릭 -> 좋아요 상태 변경
	*/
	const handlerFavorite = () => {
		if (isFavorite) {
			setIsFavorite(false);
		} else {
			setIsFavorite(true);
		}
	};

	return (
		<div>
			<Card>
				<div className={style.cardWrap}>
					<CardActionArea component={Link} to="/">
						<div className={style.cardActionArea}>
							<div className={style.cardMedia}>
								<CardMedia component="img" image={beer.image} alt={beer.name} />
							</div>
							<CardContent className={style.cardContent}>
								<div>
									<Typography
										gutterBottom
										variant="h6"
										component="div"
										sx={{ mb: 2 }}
									>
										{beer.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{beer.largeCategory} &gt; {beer.subCategory}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										도수 : {beer.abv}%
									</Typography>
								</div>
								<Rating
									name="half-rating-read"
									defaultValue={2.5}
									precision={0.5}
									value={rate}
									readOnly
								/>
							</CardContent>
						</div>
					</CardActionArea>
					<div className={style.cardFavorite}>
						{isFavorite ? (
							<FavoriteIcon
								className={style.favorite}
								onClick={() => handlerFavorite()}
							/>
						) : (
							<FavoriteBorderIcon
								className={style.favorite}
								onClick={() => handlerFavorite()}
							/>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
}

export default BeerCard;
