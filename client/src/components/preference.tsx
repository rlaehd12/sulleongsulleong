import React, { useEffect, useState, useRef } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginModal from './loginModal';

import Style from '../styles/beerCard.module.css';
import customAxios from '../customAxios';

interface PreferenceProps {
	beerId: number;
}

function Preference({ beerId }: PreferenceProps) {
	const [isFavorite, setIsFavorite] = useState<boolean>(false); // 좋아요 상태 관리
	const isFavoriteRef = useRef(isFavorite);
	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // setTimeout의 ID를 추적하기 위한 ref
	const [openModal, setOpenModal] = useState<boolean>(false);
	/*
	사용자 좋아요 클릭 -> 좋아요 상태 변경
	*/

	// useEffect(() => {
	// 	// 로그인 상태 아니면 중단
	// 	if (!sessionStorage.getItem('authorization')) return;

	// 	// 좋아요 상태 초기화
	// 	customAxios()
	// 		.post(`/beers/preference/${beerId}`)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			setIsFavorite(response.data.result);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error sending the request:', error);
	// 		});
	// }, []);
	/*
	리스트 좋아요 상태 초기화 => 사용자의 좋아요를 조회하는 API 필요
	*/

	useEffect(() => {
		isFavoriteRef.current = isFavorite; // 상태가 변경될 때마다 ref를 업데이트
	}, [isFavorite]);

	const handlerFavorite = () => {
		if (
			sessionStorage.getItem('Authorization') &&
			sessionStorage.getItem('Role')
		) {
			setOpenModal(true);
			return;
		}

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
					.post(`/beers/preference/${beerId}`)
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
		<div className={Style.cardFavorite}>
			{isFavorite ? (
				<FavoriteIcon
					className={Style.favorite}
					onClick={() => handlerFavorite()}
				/>
			) : (
				<FavoriteBorderIcon
					className={Style.favorite}
					onClick={() => handlerFavorite()}
				/>
			)}
			{openModal && (
				<LoginModal openModal={openModal} setOpenModal={setOpenModal} />
			)}
		</div>
	);
}

export default Preference;
