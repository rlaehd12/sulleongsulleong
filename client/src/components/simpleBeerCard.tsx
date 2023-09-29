import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import beerIcon from '../images/beer.png';

import style from '../styles/simpleBeerCard.module.css';

interface Beer {
	id: number;
	image: string;
	name: string;
}

interface SimpleBeerCardProps {
	beer: Beer;
}

function SimpleBeerCard({ beer }: SimpleBeerCardProps) {
	return (
		<div className={style.card}>
			<Card>
				<CardActionArea component={Link} to={`/detail/${beer.id}`}>
					<div className={style.imgContainer}>
						<CardMedia
							component="img"
							image={beer.image}
							className={style.beerImg}
							onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
								const target = e.target as HTMLImageElement;
								target.src = beerIcon; // 이미지 로드에 실패하면 beerIcon으로 대체
							}}
							alt={beer.name}
						/>
					</div>
					<CardContent>
						<Typography variant="subtitle1" align="center" noWrap>
							{beer.name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
}

export default SimpleBeerCard;
