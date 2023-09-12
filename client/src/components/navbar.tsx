import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo_kr.png';
import style from '../styles/navbar.module.css';

function navbar() {
	return (
		<div className={style.navbar}>
			<Link to="/">
				<img className={style.navLogo} src={logo} alt="Logo" />
			</Link>
		</div>
	);
}

export default navbar;
