import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo_noText.png';
import style from './navbar.module.css';

function navbar() {
	return (
		<div className={style.navbar}>
			<Link to="/">
				<img className={style.navLogo} src={logo} alt="Logo" />
			</Link>
			<Link to="/login">
				<span className={style.login}>로그인</span>
			</Link>
		</div>
	);
}

export default navbar;
