import React from 'react';
import {Link, useLocation} from "react-router-dom";
import Cart from "assets/cart.svg";
import Lalasia from "assets/lalasia.svg";
import Logo from "assets/logo.svg";
import User from "assets/user.svg";
import styles from "./Header.module.scss";

const Header = () => {
	const location = useLocation();

	return (
		<header className={styles.header}>

			<div className={styles["logo-block"]}>
				<img src={Logo} alt="logo" className={styles["logo-block__logo"]}/>
				<img src={Lalasia} alt="lalasia" className={styles["logo-block__lalasia"]}/>
			</div>

			<ul className={styles.navigation}>
				<Link to="/"><li
					className={`${styles.navigation__item} ${(location.pathname === "/" || location.pathname.includes("product")) && styles.active}`}>Products</li></Link>
				<Link to="/categories"><li
					className={`${styles.navigation__item} ${location.pathname === "/categories" && styles.active}`}>Categories</li></Link>
				<Link to="/about_us"><li
					className={`${styles.navigation__item} ${location.pathname === "/about_us" && styles.active}`}>About us</li></Link>
			</ul>

			<div className={styles.icons}>
				<Link to="/cart"><img className={styles.icons__item} src={Cart} alt="cart"/></Link>
				<img className={styles.icons__item} src={User} alt="user"/>
			</div>

		</header>
	);
}

export default Header;