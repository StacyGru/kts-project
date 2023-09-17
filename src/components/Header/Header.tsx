import Cart from "assets/cart.svg";
import Lalasia from "assets/lalasia.svg";
import Logo from "assets/logo.svg";
import User from "assets/user.svg";
import styles from "./Header.module.scss";
import {Link} from "react-router-dom";

const Header = () => {
	return (
		<header className={styles.header}>

			<div className={styles.div_logo}>
				<img src={Logo} alt="logo" className={styles.logo}/>
				<img src={Lalasia} alt="lalasia" className={styles.lalasia}/>
			</div>

			<ul className={styles.div_navigation}>
				<Link to="/"><li className={styles.div_navigation_item}>Products</li></Link>
				<li className={styles.div_navigation_item}>Categories</li>
				<li className={styles.div_navigation_item}>About us</li>
			</ul>

			<div className={styles.div_icons}>
				<img className={styles.div_icons_item} src={Cart} alt="cart"/>
				<img className={styles.div_icons_item} src={User} alt="user"/>
			</div>

		</header>
	);
}

export default Header;