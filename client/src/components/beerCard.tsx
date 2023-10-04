import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Preference from './preference';
import beerIcon from '../images/beer.png';

import style from '../styles/beerCard.module.css';

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

interface BeerCardProps {
	beer: Beer;
	clickPrefer: (targerBeerId: number) => void;
}

function BeerCard({ beer, clickPrefer }: BeerCardProps) {
	return (
		<Card>
			<div className={style.card}>
				<CardActionArea component={Link} to={`/detail/${beer.id}`}>
					<div className={style.cardActionArea}>
						<div className={style.cardMedia}>
							<CardMedia
								component="img"
								image={beer.image}
								onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
									const target = e.target as HTMLImageElement;
									target.src = beerIcon; // 이미지 로드에 실패하면 beerIcon으로 대체
								}}
								alt={beer.nameKor}
							/>
						</div>
						<CardContent className={style.cardContent}>
							<div>
								<Typography gutterBottom variant="h6" component="div" noWrap>
									{beer.nameKor || beer.name}
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
								value={beer.score / 2}
								readOnly
							/>
						</CardContent>
					</div>
				</CardActionArea>
				<Preference
					beerId={beer.id}
					prefer={beer.prefer}
					preferCount={beer.preferCount}
					clickPrefer={clickPrefer}
				/>
			</div>
		</Card>
	);
}

export default BeerCard;
