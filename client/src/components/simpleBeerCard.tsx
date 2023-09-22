import React, { useEffect, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

import style from '../styles/beerCard.module.css';

interface Beer {
	id: number;
	image: string;
	nameKor: string;
}

interface SimpleBeerCardProps {
	beer: Beer;
}

function SimpleBeerCard({ beer }: SimpleBeerCardProps) {
	return (
		<Card sx={{ maxWidth: 150 }}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image={beer.image}
					alt="green iguana"
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{beer.nameKor}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default SimpleBeerCard;
