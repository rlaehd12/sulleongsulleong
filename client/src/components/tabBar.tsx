import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
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
		if (location.pathname === '/dict') {
			return 'dict';
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

	useEffect(() => {
		setValue(getCurrentValue());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

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
				label="맥주도감"
				value="dict"
				icon={<AutoStoriesIcon />}
				component={Link}
				to="/dict"
			/>
			<BottomNavigationAction
				label="추천목록"
				value="recommend"
				icon={<RecommendIcon />}
				component={Link}
				to="/recommendList"
			/>
			<BottomNavigationAction
				label="내정보"
				value="myPage"
				icon={<PersonIcon />}
				component={Link}
				to="/myPage"
			/>
		</BottomNavigation>
	);
}

export default TabBar;
