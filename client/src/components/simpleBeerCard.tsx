import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

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
							alt={beer.name}
						/>
					</div>
					<CardContent>
						<Typography variant="subtitle1" align="center" noWrap gutterBottom>
							{beer.name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
}

export default SimpleBeerCard;
