import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import style from '../styles/scrollButton.module.css';

function ScrollButton() {
	const handleScrollToTop = () => {
		window.scrollTo(0, 0);
	};

	const handleScrollToBottom = () => {
		window.scrollTo(0, document.body.scrollHeight);
	};

	return (
		<div>
			<button
				type="button"
				onClick={handleScrollToTop}
				className={style.scrollToTopButton}
			>
				<KeyboardArrowUpIcon />
			</button>

			<button
				type="button"
				onClick={handleScrollToBottom}
				className={style.scrollToBottomButton}
			>
				<KeyboardArrowDownIcon />
			</button>
		</div>
	);
}

export default ScrollButton;
