import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import PageHeader from "components/PageHeader";
import CartList from "pages/Cart/components/CartList";
import TotalPrice from "pages/Cart/components/TotalPrice";
import rootStore from "store/RootStore";
import styles from "./Cart.module.scss";

const Cart = () => {
	const cartListJSON = localStorage.getItem("cartList");
	const cartList = rootStore.cart.cartList;

	useEffect(() => {
		if (cartListJSON) {
			rootStore.cart.setCartList(JSON.parse(cartListJSON));
		} else {
			rootStore.cart.setCartList([]);
		}
	}, [cartListJSON]);

	return (
		<div className={styles.cart}>
			<PageHeader text="Cart"/>

			<CartList cartList={cartList}/>

			<TotalPrice
				cartListLength={cartList.length}
			/>
		</div>
	);
}

export default observer(Cart);