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
		<div className={style.beerItem}>
			<Card>
				<CardActionArea component={Link} to={`/detail/${beer.id}`}>
					<div className={style.cardMediaImage}>
						<CardMedia
							component="img"
							height="200"
							image={beer.image}
							alt="green iguana"
						/>
					</div>
					<CardContent>
						<Typography
							variant="body2"
							color="text.secondary"
							className={style.truncateText}
						>
							{beer.name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
}

export default SimpleBeerCard;
