import React from 'react';
import Cart from "assets/cart.svg";
import Lalasia from "assets/lalasia.svg";
import Logo from "assets/logo.svg";
import User from "assets/user.svg";
import styles from "./Header.module.scss";
import {Link, useLocation} from "react-router-dom";

const Header = () => {
	const location = useLocation();

	return (
		<header className={styles.header}>

			<div className={styles.div_logo}>
				<img src={Logo} alt="logo" className={styles.logo}/>
				<img src={Lalasia} alt="lalasia" className={styles.lalasia}/>
			</div>

			<ul className={styles.div_navigation}>
				<Link to="/"><li
					className={`${styles.div_navigation_item} ${location.pathname === "/" && styles.active}`}>Products</li></Link>
				<Link to="/categories"><li
					className={`${styles.div_navigation_item} ${location.pathname === "/categories" && styles.active}`}>Categories</li></Link>
				<Link to="/about_us"><li
					className={`${styles.div_navigation_item} ${location.pathname === "/about_us" && styles.active}`}>About us</li></Link>
			</ul>

			<div className={styles.div_icons}>
				<img className={styles.div_icons_item} src={Cart} alt="cart"/>
				<img className={styles.div_icons_item} src={User} alt="user"/>
			</div>

		</header>
	);
}

export default Header;