import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import style from './beerCard.module.css';
import customAxios from '../customAxios';

function Preference() {
	const [isFavorite, setIsFavorite] = useState<boolean>(false); // 좋아요 상태 관리
	const isFavoriteRef = useRef(isFavorite);
	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // setTimeout의 ID를 추적하기 위한 ref
	/*
	사용자 좋아요 클릭 -> 좋아요 상태 변경
	*/

	useEffect(() => {
		isFavoriteRef.current = isFavorite; // 상태가 변경될 때마다 ref를 업데이트
	}, [isFavorite]);

	const handlerFavorite = () => {
		const previousFavoriteState = isFavorite;
		setIsFavorite(!isFavorite); // 상태 토글

		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		timeoutIdRef.current = setTimeout(() => {
			console.log(previousFavoriteState, isFavoriteRef.current);
			// 3초 후에 바뀐 상태가 유지되면 POST 요청을 보낸다.
			if (previousFavoriteState !== isFavoriteRef.current) {
				customAxios()
					.post('/beers/preference/1')
					.then((response) => {
						console.log(response.data);
					})
					.catch((error) => {
						console.error('Error sending the request:', error);
					});
			}
		}, 3000);
	};

	return (
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
	);
}

export default Preference;
