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
	image_url: string;
	id: number;
	name: string;
	// 필요한 경우 다른 필드들을 추가할 수 있습니다.
}

interface BeerCardProps {
	beer: Beer;
}

function BeerCard({ beer }: BeerCardProps) {
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const [rate, setRate] = useState<number>(3.5);

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
								<CardMedia
									component="img"
									image={beer.image_url}
									alt={beer.name}
								/>
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
										{beer.id}
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
