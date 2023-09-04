import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
	return (
		<div>
			<Card>
				<CardActionArea component={Link} to="/">
					<div className={style.cardWrap}>
						<div className={style.cardMedia}>
							<CardMedia
								component="img"
								image={beer.image_url}
								alt={beer.name}
							/>
						</div>
						<div className={style.cardContent}>
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									sx={{ mb: 2 }}
								>
									{beer.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{beer.id}
								</Typography>
							</CardContent>
						</div>
						<div className={style.cardFavorite}>
							<FavoriteBorderIcon />
						</div>
					</div>
				</CardActionArea>
			</Card>
		</div>
	);
}

export default BeerCard;
