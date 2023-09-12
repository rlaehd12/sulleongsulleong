import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import RecommendIcon from '@mui/icons-material/Recommend';
import PersonIcon from '@mui/icons-material/Person';
import style from '../styles/tabBar.module.css';

function TabBar() {
	const location = useLocation();

	const getCurrentValue = () => {
		if (location.pathname === '/') {
			return 'home';
		}
		if (location.pathname === '/searchresult') {
			return 'search';
		}
		if (location.pathname === '/recommendList') {
			return 'recommend';
		}
		if (location.pathname === '/myPage') {
			return 'myPage';
		}
		return 'home';
	};

	const [value, setValue] = useState(getCurrentValue());

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<BottomNavigation
			className={style.tabBar}
			value={value}
			onChange={handleChange}
		>
			<BottomNavigationAction
				label="홈"
				value="home"
				icon={<HomeIcon />}
				component={Link}
				to="/"
			/>
			<BottomNavigationAction
				label="검색"
				value="search"
				icon={<SearchIcon />}
				component={Link}
				to="/searchresult"
			/>
			<BottomNavigationAction
				label="추천리스트"
				value="recommend"
				icon={<RecommendIcon />}
				component={Link}
				to="/recommendList"
			/>
			<BottomNavigationAction
				label="마이페이지"
				value="myPage"
				icon={<PersonIcon />}
				component={Link}
				to="/myPage"
			/>
		</BottomNavigation>
	);
}

export default TabBar;
