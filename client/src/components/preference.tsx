import React, { useEffect, useState, useRef } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import style from '../styles/preference.module.css';

interface PreferenceProps {
	beerId: number;
	prefer: boolean;
	preferCount: number;
	clickPrefer: (targerBeerId: number) => void;
}

function Preference({
	beerId,
	prefer,
	preferCount,
	clickPrefer,
}: PreferenceProps) {
	const [currentPrefer, setCurrentPrefer] = useState(prefer);
	const [currentPreferCount, setCurrentPreferCount] = useState(preferCount);
	const preferRef = useRef(prefer);
	const preferCountRef = useRef(preferCount);
	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // setTimeout의 ID를 추적하기 위한 ref

	useEffect(() => {
		preferRef.current = prefer; // 상태가 변경될 때마다 ref를 업데이트
		preferCountRef.current = preferCount;
		setCurrentPrefer(prefer);
		setCurrentPreferCount(preferCount);
	}, [prefer, preferCount]);

	const handlerPrefer = () => {
		preferRef.current = !preferRef.current;
		if (preferRef.current) {
			preferCountRef.current += 1;
		} else {
			preferCountRef.current -= 1;
		}
		setCurrentPrefer(preferRef.current);
		setCurrentPreferCount(preferCountRef.current);

		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		timeoutIdRef.current = setTimeout(() => {
			// 3초 후에 바뀐 상태가 유지되면 POST 요청을 보낸다.
			if (
				prefer !== preferRef.current &&
				preferCount !== preferCountRef.current
			) {
				clickPrefer(beerId);
			}
		}, 3000);
	};

	return (
		<div className={style.preferenceWrap}>
			{preferRef.current ? (
				<FavoriteIcon
					className={style.preference}
					onClick={() => handlerPrefer()}
				/>
			) : (
				<FavoriteBorderIcon
					className={style.preference}
					onClick={() => handlerPrefer()}
				/>
			)}
			<div>{currentPreferCount}</div>
		</div>
	);
}

export default Preference;
